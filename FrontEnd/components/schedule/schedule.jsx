import React, { useEffect, useState } from "react";
import axios from "axios";
import "./schedule.scss";
import InputSchedule from "./inputSchedule";
import PostOutput from "./postOutputSchedule";
import Progress from "../progress/progress";
import CloseButton from "../button/customButton";
import { onClickCoordinates } from "../../redux/scheduleSlice.js";
import { useDispatch } from "react-redux";
import TimeData from "./scheduleTimeData.js";

const Schedules = (props) => {
  const [stopTime, setStopTime] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [time, setTime] = useState(TimeData); // time for arrivals and departure based on input
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // axios will automatically stringifies the data
    // configures HTTP interceptors
    // have a multiple simultaneous request 
    const url = "https://raw.githubusercontent.com/braucalderon/trackingPredictionSystem/main/ohio_transit_data/jsonFiles/stops.json";
    async function fetchData() {
      try {
        const request = await axios.get(url);
        setStopTime(request.data);
        setError(true);
        // console.log(request);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };
  const onSearchChangeTime = (event) => {
    setTime(event.target.value);
  };

  let coordinates = [];
  let posts = <Progress />;
  let disabledButton = true;

  if (error && stopTime.length > 10) {
    posts = stopTime.map((stop, index) => {
      if (
        stop.stop_name === searchField.toUpperCase() ||
        stop.stop_id === searchField.toUpperCase()
      ) {
        coordinates.push(stop.stop_lon);
        coordinates.push(stop.stop_lat);
        disabledButton = false;
        return (
          <PostOutput
            key={stop.stop_id + index}
            stop_id={stop.stop_id}
            time={time}
            stopName={stop.stop_name}
          />
        );
      }
      return null;
    });
  }

  return (
    <React.Fragment>
      <div className="scheduleInput">
        <InputSchedule
          onSearchChange={onSearchChange}
          onSearchChangeTime={onSearchChangeTime}
          timeData={time}
        />
      </div>

      <div className="scheduleSearch">{posts}</div>

      <div className="scheduleButtons">
        <CloseButton
          buttonClose="Close"
          position={false}
          buttonTittle="Pin Location"
          scheduleHandler={() => dispatch(onClickCoordinates(coordinates))}
          disabled={disabledButton}
        />
      </div>
    </React.Fragment>
  );
};
export default Schedules;
