import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Stepper, Step, StepLabel, Typography } from "@material-ui/core";
import './trip.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function getSteps(departure, arrival) {
  return [
    `At ${departure.toLowerCase()} Station`,
    "Leaving",
    "On the Road",
    "Halfway",
    `Arriving at ${arrival.toLowerCase()} Station`,
  ];
}

function getStepsConnected(stepIndex) {
  switch (stepIndex) {
    case 0:
      return `Will depart in 10 minutes`;
    case 1:
      return `Departing the Station`;
    case 2:
      return "Left the Station";
    case 3:
      return `Halfway to destination`;
    case 4:
      return `Arriving in 10 minutes`;
    default:
      return "";
  }
}

// -----------------------------------------
//  Main Function
const TripStepper = (props) => {
  const classes = useStyles();
  const [stepActive, setStepActive] = useState(-1);
  const [date, setDate] = useState(new Date());
  const [stepsTimer, setStepsTimer] = useState(0);
  const steps = getSteps(props.stopIdFrom, props.stopIdTo);
  const [timer1, setTimer1] = useState(10); // value is equal to seconds (1 minute = 60 seconds)
  const [timer2, setTimer2] = useState(15);
  const [timer3, setTimer3] = useState(40);
  const [timer4, setTimer4] = useState(40);
  const [timer5, setTimer5] = useState(10);
  let checkTimer = date.toLocaleTimeString();

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  
  // set timers
  const setHandlerTimer1 = React.useCallback(() => {
    timer1 > 0 ? setTimeout(() => setTimer1(timer1 - 1), 1000) : setTimer1(0);
  }, [timer1]);
  const setHandlerTimer2 = React.useCallback(() => {
    timer2 > 0 ? setTimeout(() => setTimer2(timer2 - 1), 1000) : setTimer2(0);
  }, [timer2]);
  const setHandlerTimer3 = React.useCallback(() => {
    timer3 > 0 ? setTimeout(() => setTimer3(timer3 - 1), 1000) : setTimer3(0);
  }, [timer3]);
  const setHandlerTimer4 = React.useCallback(() => {
    timer4 > 0 ? setTimeout(() => setTimer4(timer4 - 1), 1000) : setTimer4(0);
  }, [timer4]);
  const setHandlerTimer5 = React.useCallback(() => {
    timer5 > 0 ? setTimeout(() => setTimer5(timer5 - 1), 1000) : setTimer5(0);
  }, [timer5]);


  // -----------------------------------------------------------
  //   check real time with time schedules
  useEffect(() => {
    setStepActive(props.stepActive);
    
    if (props.stopIdFrom && props.stopIdTo) { 
      if(checkTimer.substring(0,4) >= props.departureTime.substring(0,4) ){
        getStepsConnected(setStepActive(0));
        setHandlerTimer1();
        
        if(timer1 === 0){
          getStepsConnected(setStepActive(1));
          setHandlerTimer2();
        }
        if(timer2 === 0 ){
          getStepsConnected(setStepActive(2));
          setHandlerTimer3();
        }
        if(timer3 === 0){
          getStepsConnected(setStepActive(3));
          setHandlerTimer4();
        }
        if(timer4 === 0){
          getStepsConnected(setStepActive(4))
          setHandlerTimer5();
        }
        if(timer5 === 0){
          setStepActive(5);
        }
      }
    
    }
   
  }, [
    checkTimer,
    stepActive,
    props.arrivalTime,
    props.departureTime,
    props.stepActive,
    props.stopIdTo,
    date,
    props.stopIdFrom,
    timer1,
    timer2,
    timer3,
    timer4,
    timer5,
    setTimer1,
    stepsTimer,
    setHandlerTimer1,
    setHandlerTimer2,
    setHandlerTimer3,
    setHandlerTimer4,
    setHandlerTimer5
   
  ]);

  // last step from getStepsConnected function
  let postMessage =
    stepActive === 5 ? (
      <div>
        <Typography>Arrived</Typography>
      </div>
    ) : (
      <div>
        <Typography>{getStepsConnected(stepActive)}</Typography>
      </div>
    );

  // error Message when trip_id do not match
  let errorMessage = props.errorBoolean ? (
    <div>{props.errorMessage}</div>
  ) : <div>{props.errorMessage}</div>;

  // console.log(props.timeSelected);
  return (
    <React.Fragment>
    <div >
      {`Departure Time: ${props.departureTime}`}
    </div>
    <div>

    {`Real Time: ${checkTimer}`}
    </div>
      <div className={classes.root}>
        <Stepper activeStep={stepActive} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div
          style={{
            height: "5vh",
            textAlign: "center",
            width: "100%",
            marginBottom: "0",
            paddingBottom: "0",
          }}
        >
       <div className='tripsErrorMessage'>
          {postMessage}
          {errorMessage}
        </div>
          
        </div>
        
      </div>
      
    </React.Fragment>
  );
};
export default TripStepper;
