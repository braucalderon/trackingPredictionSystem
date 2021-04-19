import React from "react";
import TextField from "@material-ui/core/TextField";

const TripsInput = (props) => {
  return (
    <TextField
      style={{ width: "80%" }}
      id="outlined-basic"
      label="Enter Stop Name or Stop ID"
      variant="outlined"
      size="small"
    />
  );
};
export default TripsInput;
