import React, { useEffect, useState } from "react";
import CustomButton from "../button/customButton";
import TripsInput from "./tripsInput";
import axios from "axios";

const Trips = (props) => {
  const [stops, setStops] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [error, setError] = useState(true);
  const [time, setTime] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [midday, setMidday] = useState({
    time: "",
  });

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/braucalderon/trackingPredictionSystem/main/ohio_transit_data/jsonFiles/stop_times.json";
    async function fetchData() {
      try {
        const request = await axios.get(url);
        setStops(request.data);
        setError(false);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //  Functions
  const onChangeHandlerFrom = (event) => {
    setFromLocation(event.target.value);
  };
  const onChangeHandlerTo = (event) => {
    setToLocation(event.target.value);
  };
  const onChangeHandlerMidday = (event) => {
    // ref. name is the property in tripsInput.jsx name:'time'
    const name = event.target.name;
    setMidday({
      [name]: event.target.value,
    });
  };
  const onTimeHandlerChange = (event) => {
    setTime(event.target.value);
  };
  const onChangeHandlerMinutes = (event) => {
    setMinutes(event.target.value);
  };

  let activeBoolean = true;
  let tripIdFrom = "";
  let departureTimeFrom = "";
  let arrivalTimeTo = "";
  let hourFrom = null;
  let minutesFrom = null;
  let stopIdFrom = "";
  let stopIdTo = "";
  let checkMatchTo = false;
  let modalErrorMessage = false;
  let modalErrorBoolean = false;
  let stopFrom = null;
  let stepActive = -1; // to reset the steeper in tripsStepper component

  // stops the iteration based on the boolean value
  if (activeBoolean) {
    let valueFrom = fromLocation.toUpperCase().trim();
    stopFrom = stops.filter((stop) => stop.stop_id === valueFrom);
    modalErrorMessage = stopFrom.length !== 0 ? true : false;

    const tripIdMidday =
      stopFrom !== undefined
        ? stopFrom.filter((trip) =>
            trip.departure_time.includes(`${midday.time}`)
          )
        : null;
    tripIdFrom = tripIdMidday.find((trip) =>
      trip.departure_time.includes(`${time}:${minutes}:`)
    );
    const c = tripIdFrom === undefined ? true : false;

    stopIdFrom = tripIdFrom ? valueFrom : "";
    activeBoolean = !c ? false : true;
    departureTimeFrom = tripIdFrom ? tripIdFrom.departure_time : "";
  }

  if (!activeBoolean) {
    let valueTo = toLocation.toUpperCase().trim();
    const stopTo = stops.filter((stop) => stop.stop_id === valueTo);
    const tripId = stopTo.find((trip) => trip.trip_id === tripIdFrom.trip_id);
    // console.log(tripId);

    checkMatchTo =
      tripId && tripIdFrom.trip_id === tripId.trip_id ? true : false;
    checkMatchTo = tripId && tripId.stop_id ? true : false;
    stopIdTo = checkMatchTo && tripId ? valueTo : "";
    // modalErrorBoolean = tripIdFrom.trip_id !== tripId.trip_id ? true : false;
  }
  // error message based on trip_id
  if (modalErrorBoolean) {
    stepActive = -1;
    let stopFrom = stopIdFrom;
    let stopTo = stopIdTo;
    let time = departureTimeFrom;
    arrivalTimeTo = "";
    departureTimeFrom = "";
    stopIdFrom = "";
    stopIdTo = "";
    modalErrorMessage = (
      <h3>{`${stopFrom} DOES NOT STOP ON ${stopTo} at ${time}`}</h3>
    );
  } else if (!modalErrorMessage && fromLocation.length > 2 && activeBoolean) {
    // slice will return a shallow copy from start to end, represented by the index
    let value = fromLocation.charAt(0).toUpperCase() + fromLocation.slice(1);
    modalErrorMessage = <h3>{`${value} does not match any stops`}</h3>;
  } else if (!modalErrorMessage && toLocation.length > 2 && !checkMatchTo) {
    let value = toLocation.charAt(0).toUpperCase() + toLocation.slice(1);
    modalErrorMessage = <h3>{`${value} does not match any stops`}</h3>;
  }
  return (
    <div>
      <TripsInput
        handlerTo={onChangeHandlerTo}
        handlerFrom={onChangeHandlerFrom}
        disabledInputTo={activeBoolean}
        disabledInputFrom={error}
        stopIdFrom={stopIdFrom}
        arrivalTime={arrivalTimeTo}
        departureTime={departureTimeFrom}
        stopIdTo={stopIdTo}
        errorMessage={modalErrorMessage}
        errorBoolean={modalErrorBoolean}
        hourFrom={hourFrom}
        minutesFrom={minutesFrom}
        stepActive={stepActive}
        valueSelectTime={time}
        onChangeSelectTime={onTimeHandlerChange}
        valueMidday={midday.time}
        onChangeMidday={onChangeHandlerMidday}
        onHandlerMinutes={onChangeHandlerMinutes}
      />
      <div style={{ height: "7vh", marginTop: "5%", marginBottom: "1%" }}>
        <CustomButton position={true} buttonClose="Close" />
      </div>
    </div>
  );
};
export default Trips;
