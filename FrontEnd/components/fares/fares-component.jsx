import React, { useEffect, useState } from "react";
import axios from "axios";
import Progress from "../progress/progress";
import CustomButton from '../button/customButton';
import "./fares-component.scss";

const Fares = (props) => {
  const [data, setData] = useState([]);
  const [failure, setFailure] = useState(true);

  useEffect(() => {
    // axios protects against XSRT cross-site request forgery
    // attackers disguises as a trusted user bet app and the user
    const url =
      "https://raw.githubusercontent.com/braucalderon/trackingPredictionSystem/main/ohio_transit_data/jsonFiles/fares.json";
    async function fetchData() {
      try {
        const request = await axios.get(url);
        setData(request.data);
        setFailure(false);
        return request;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  let faresDisplay = <Progress />;

  if (!failure) {
    const transfer = data.map((item) => item.transfer_duration);
    const transferDuration = transfer ? transfer[0] / 3600 : null;
    const price = data.map((item) => item.price);
    const farePrice = price ? `Fare Cost $${price[0]}` : null;
    const fareId = data.map((item) => item.fare_id);
    faresDisplay = (
      <div className='fareContainer'>
        <div className="faresComponent">
          <h2>{fareId[0]}</h2>
          <div>{farePrice}</div>
          <div>{`Ticket valid for  ${transferDuration} hours transfer`}</div>
        </div>
        <div className='faresComponent'>
          <h2>{fareId[1]}</h2>
          <div>{farePrice}</div>
          <div>{`Ticket valid for ${transferDuration} hours transfer`}</div>
        </div>
        <CustomButton position={true} buttonClose='Close'/> 
      </div>
    );
  }
  return (
  <div>
  {faresDisplay}

  </div>
  );
};
export default Fares;
