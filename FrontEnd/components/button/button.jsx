import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// ---------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'transparent',
    padding: ".5vh",
    color: "secondary",
    variant: "outlined",
    "&:hover": {
      border: "3px solid black",
      backgroundColor: "transparent",
    },
  },
}));

// ------------------------------------------------
// Main Function
const CustomButton = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const onClickHandler = () => {
    history.push(props.route);
  };

  return (
    <Button
      variant='contained'
      
      onClick={onClickHandler}
    >
      {props.name}
    </Button>
  );
};
export default CustomButton;
