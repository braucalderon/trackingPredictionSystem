import React, { useEffect, useState } from "react";
import axios from "axios";
import "./schedule.scss";
import InputSchedule from "./inputSchedule";
import PostOutput from "./postOutputSchedule";
import Progress from "../progress/progress";
import CloseButton from "../button/subMenuButton";
import { onClickCoordinates } from "../../redux/scheduleSlice.js";
import { useDispatch } from "react-redux";
import TimeData from './scheduleTimeData.js';

const Schedules = (props) => {
  const [stopTime, setStopTime] = useState([]);
  const [searchField, setSearchField] = useState("");
  // time for arrivals and departure based on input
  const [time, setTime] = useState(TimeData);
  const dispatch = useDispatch();

  useEffect(() => {
    const url =
    "http://localhost:3001/scheduleGetter";//busStopFinder
    async function fetchData() {
      try {
        const request = await axios.get(url,{params:{busIDEnter: `${searchField}`}});
        setStopTime(request.data);
        console.log("should get json back",request.data);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [searchField]);

  //edit text view for "stop name & ID"
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  //edit text view for "time"
  const onSearchChangeTime = (event) => {
    setTime(event.target.value);
  };

  // console.log("Search Field Array Values", searchField);
  // console.log("Stop Time Array Values", stopTime);
  // store coordinates for the station clicked

  let coordinates = []; //contains the actual coords to be used
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

  // console.log("Posts:",posts);
  // console.log("Time:",time);
  console.log("Coords Array:", coordinates);

  return (
    <React.Fragment>
      <div className="scheduleInput">
        <InputSchedule
          onSearchChange={onSearchChange}
          onSearchChangeTime={onSearchChangeTime}
          timeData = {time}
        />
      </div>

      <div className="scheduleSearch">{posts}</div>

      <div className="scheduleButtons">
        <CloseButton
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