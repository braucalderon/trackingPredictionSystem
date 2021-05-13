import React, { useEffect, useState } from "react";
import axios from "axios";
import "./schedule.scss";

const PostOutput = (props) => {
  const [stop, setStop] = useState([]);

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/braucalderon/trackingPredictionSystem/main/ohio_transit_data/jsonFiles/stop_times.json";
    async function fetchData() {
      try {
        const request = await axios.get(url);
        setStop(request.data);
        // console.log(request.data);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  // console.log('props.time: '+props.time+':');
  // console.log('props.stop_id: '+props.stop_id);
  // console.log(stop);

  let post = null;
  // render the result post if the search is true
  post = stop.map((stop, index) => {
    // console.log('stop_arrival_time: '+ stop.arrival_time.substring(0, 2));
    if (props.stop_id === stop.stop_id) {
      // console.log('passed1');

      if (props.time >= 0 && props.time < 1) {
        // console.log('passed 1');
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
        props.time >= 1 &&
        props.time + ":" === stop.arrival_time.substring(0, 2)
      ) {
        // console.log('passed 2');
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
      if (props.time > 9 && props.time === stop.arrival_time.substring(0, 2)) {
        // console.log('passed 3');
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
  return post;
};
export default PostOutput;
