import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import "./button.scss";
import { onClickStateBoolean, onClickStateErrorButton } from "../../redux/subMenuSlice.js";
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
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '1.5vh',
      
    },
  },
}));

const CustomButton = (props) => {
  const classes = useStyles();
  // dispatch is used to close the modal with false or true from the subMenu slice component
  const dispatch = useDispatch();
  let errorButton = props.errorMessage ? (
    <Button
    variant="outlined"
    color="primary"
    className={classes.root}
    onClick={() => dispatch(onClickStateErrorButton())}
  >
    {props.errorButtonName}
  </Button>
  ) : null;

  // true = one button position  false = two buttons position
  let positionButton = props.position ? (
    <div className="button">
      <Button
        variant="outlined"
        color="primary"
        className={classes.root}
        onClick={() => dispatch(onClickStateBoolean())}
      >
        {props.buttonClose}
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
        {props.buttonTittle}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.root}
        onClick={() => dispatch(onClickStateBoolean())}
      >
        {props.buttonClose}
      </Button>
    </div>
  );

  return (
    <React.Fragment>
      {positionButton}
      {errorButton}
    </React.Fragment>

    )
};
export default CustomButton;
