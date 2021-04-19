import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import "./button.scss";
import { onClickStateBoolean } from "../../redux/subMenuSlice.js";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    // border: '2px blue solid',
    width: "40%",
    "&:hover": {
      backgroundColor: "#BAD3E9",
      borderStyle: "none",
      color: "black"
    },
  },
}));

const CustomButton = (props) => {
  const classes = useStyles();
  // dispatch is used to close the modal with false or true from the subMenu slice component
  const dispatch = useDispatch();

  // true = one button position  false = two buttons position
  let positionButton = props.position ? (
    <div className="button">
      <Button
        variant="outlined"
        color="primary"
        className={classes.root}
        onClick={() => dispatch(onClickStateBoolean())}
      >
        {props.name}
      </Button>
    </div>
  ) : (
    <div className="buttonSchedule">
      <Button
        variant="outlined"
        color="primary"
        className={classes.root}
        onClick={props.scheduleHandler}
        disabled={props.disabled}
      >
        {props.name2}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.root}
        onClick={() => dispatch(onClickStateBoolean())}
      >
        {props.name}
      </Button>
    </div>
  );

  return positionButton;
};
export default CustomButton;
