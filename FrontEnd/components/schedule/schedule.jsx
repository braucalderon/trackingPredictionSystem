import React, { useEffect, useState } from "react";
import axios from "axios";
import "./schedule.scss";
import InputSchedule from "./inputSchedule";
import PostOutput from "./postOutputSchedule";
import Progress from "../progress/progress";
import SubMenuButton from "../button/subMenuButton";
import { onClickCoordinates } from "../../redux/scheduleSlice.js";
import { useDispatch } from "react-redux";

const Schedules = (props) => {
  const [stopTime, setStopTime] = useState([]);
  const [searchField, setSearchField] = useState("");
  // time for arrivals and departure based on input
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/braucalderon/trackingPredictionSystem/main/ohio_transit_data/jsonFiles/stops.json";
    async function fetchData() {
      try {
        const request = await axios.get(url);
        setStopTime(request.data);
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

  // console.log(searchField);
  // console.log(stopTime);
  // store coordinates for the station clicked

  let coordinates = [];
  let posts = <Progress />;
  let disabledButton = true;

  posts = stopTime.map((stop, index) => {
    if (stop.stop_name === searchField.toUpperCase() || stop.stop_id === searchField.toUpperCase()) {
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

  // console.log(stops);
  // console.log(time);
  // console.log(coordinates);

  return (
    <React.Fragment>
      <div className="scheduleInput">
        <InputSchedule
          onSearchChange={onSearchChange}
          onSearchChangeTime={onSearchChangeTime}
        />
      </div>

      <div className="scheduleSearch">{posts}</div>

      <div className="scheduleButtons">
        <SubMenuButton
          name="Close"
          position={false}
          name2="Location"
          scheduleHandler={() => dispatch(onClickCoordinates(coordinates))}
          disabled={disabledButton}
        />
      </div>
    </React.Fragment>
  );
};
export default Schedules;
