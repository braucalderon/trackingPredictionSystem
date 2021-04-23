import React, { useEffect, useState } from "react";
import axios from "axios";
import "./schedule.scss";

const PostOutput = (props) => {

  //"props" is the -stop name or id & time from spinner- entered into the 
  //edit text view in the schedule tab
  const [stop, setStop] = useState([]);
  // console.log("props", props)

  useEffect(() => {
    const url =
    "http://localhost:3001/timeGetter";
    async function fetchData() {
      try {
        const request = await axios.get(url,{params:{busID: `${props.stop_id}`}});
        setStop(request.data);
        // console.log("Times: ", setStop);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [props.stop_id]);
  // console.log(props.time);
  // console.log(props.stop_id);

  let post = null;
  // render the result post if the search is true
  post = stop.map((stop, index) => {
    if (props.stop_id === stop.stop_id) {
      // console.log('api stop_id: '+stop.stop_id);
      // console.log('props stop_id: '+props.stop_id);
       
      if (parseInt(props.time) >= 0 && parseInt(props.time) < 1) {
        return (
          <div className="singleSchedule" key={stop.trip_id + index}>
            {"Arrival time:"}
            <li>{stop.arrival_time}</li>

            {"Departure time:"}
            <li>{stop.departure_time}</li>

            {"----------------------"}
          </div>
        );
      }

      if (
        parseInt(props.time) >= 1 &&
        parseInt(props.time) === parseInt(stop.arrival_time.substring(0, 2))
      ) {
       
        return (
          <div className="singleSchedule" key={stop.stop_id + index}>
            {"Arrival time:"}
            <li>{stop.arrival_time}</li>

            {"Departure time:"}
            <li>{stop.departure_time}</li>

            {"----------------------"}
          </div>
        );
      }

      if (parseInt(props.time) > 9 && parseInt(props.time) === parseInt(stop.arrival_time.substring(0, 2))) {
        
        return (
          <div className="singleSchedule" key={stop.stop_id + index}>
            {"Arrival time:"}
            <li>{stop.arrival_time}</li>

            {"Departure time:"}
            <li>{stop.departure_time}</li>

            {"----------------------"}
          </div>
        );
      }
    }
    return null;
  });
  // console.log(post);
  // console.log("Stop Array (should be full): ", stop);
  return post;
};

export default PostOutput;