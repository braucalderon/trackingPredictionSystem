import React from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TripStepper from "./tripsStepper";
import TimeData from "../schedule/scheduleTimeData.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1%",
  },
  hours_minutes: {
    width: '38%',
    display: 'flex',
    height: 'auto',
    // border: '2px black solid',
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: '30%',
      // border: '2px black solid'
    },
  },
  minutes: {
    width: '50%',
    marginLeft: '5%',
    // border: 'black solid 2px',
    [theme.breakpoints.down('xs')]:{
      marginTop: '5%',
      width: '75%',
      marginLeft: '0'
    }

  },
  hour: {
    width: '50%',
    // border: 'black solid 2px',
    [theme.breakpoints.down('xs')]:{
      width: '75%'
    }
  },
  from_to: {
    width: '35%',
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: '35%',
      // border: '3px black solid'
    },
  },

  styleBorderFalse: {
    width: "25%",
    borderBottom: "2px solid red",
    borderRight: "1px solid red",
    borderLeft: "1px solid red",
    height: "auto",
    borderRadius: "1vh",
  },
  styleBorderTrue: {
    width: "25%",
    borderRadius: "1vh",
  },
  styleBorderFromSelectFalse: {
    borderBottom: "2px solid red",
    borderRight: "1px solid red",
    borderLeft: "1px solid red",
    height: "auto",
    borderRadius: "1vh",
  },
  styleBorderFromSelectTrue: {
    borderRadius: "1vh",
  },
}));

const TripsInput = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.from_to}>
          <TextField
            style={{ width: "100%" }}
            className={
              props.disabledInputFrom
                ? classes.styleBorderFalse
                : classes.styleBorderTrue
            }
            id="outlined-basic-from"
            label="From Location"
            variant="outlined"
            size="small"
            onChange={props.handlerFrom}
            disabled={props.disabledInputFrom}
          />

          <TextField
            style={{marginTop: '5%', width: '100%' }}
            className={
              props.disabledInputTo
                ? classes.styleBorderFalse
                : classes.styleBorderTrue
            }
            id="outlined-basic-to"
            label="To Location"
            variant="outlined"
            size="small"
            disabled={props.disabledInputTo}
            onChange={props.handlerTo}
          />
        </div>
        <div
          className={classes.hours_minutes}
        >
        <div className={classes.hour}>
          <TextField
            style={{width: '100%'}}
            className={
              props.disabledInputFrom
                ? classes.styleBorderFromSelectFalse
                : classes.styleBorderFromSelectTrue
            }
            select
            id="standard-number"
            size="small"
            type="number"
            value={props.valueSelectTime}
            defaultValue="0"
            variant="outlined"
            label="Hours"
            disabled={props.disabledInputFrom}
            onChange={props.onChangeSelectTime}
          >
            {TimeData.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.time}
              </MenuItem>
            ))}
          </TextField>
        </div>
          <div  className={classes.minutes}>
          <TextField
            style={{width: '100%'}}
            className={
              props.disabledInputFrom
                ? classes.styleBorderFromSelectFalse
                : classes.styleBorderFromSelectTrue
            }
            id="outlined-minutes"
            size="small"
            variant="outlined"
            label="Minutes"
            type="number"
            onChange={props.onHandlerMinutes}
          />
          </div>
        </div>

        <div style={{ width: "20%"}}>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="outlined-age-native-simple"
              style={{fontSize: '1.5vh'}}
            >
              AM/PM
            </InputLabel>
            <Select
              style={{ height: "5.5vh", background: "white", width: "100%" }}
              className={
                props.disabledInputFrom
                  ? classes.styleBorderFromSelectFalse
                  : classes.styleBorderFromSelectTrue
              }
              native
              value={props.valueMidday}
              onChange={props.onChangeMidday}
              disabled={props.disabledInputFrom}
              label="AM/PM"
              inputProps={{
                name: "time",
                id: "outlined-age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              <option value={"PM"}>PM</option>
              <option value={"AM"}>AM</option>
            </Select>
          </FormControl>
        </div>
      </div>
      <TripStepper
        arrivalTime={props.arrivalTime}
        departureTime={props.departureTime}
        stopIdFrom={props.stopIdFrom}
        stopIdTo={props.stopIdTo}
        errorMessage={props.errorMessage}
        errorBoolean={props.errorBoolean}
        stepActive={props.stepActive}
        timeSelected={props.valueSelectTime}
        midday={props.valueMidday}
      />
    </React.Fragment>
  );
};
export default TripsInput;
