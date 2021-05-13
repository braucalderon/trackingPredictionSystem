import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import TimeData from './scheduleTimeData.js';


const InputSchedule = (props) => {
  

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          style={{ width: "55%" }}
          id="outlined-basic"
          label="Stop Name or ID"
          variant="outlined"
          size="small"
          onChange={props.onSearchChange}
          required
        />
        <TextField
          style={{ width: "30%" }}
          select
          defaultValue={""}
          value={props.time} //|| ""
          id="outlined-basic"
          size="small"
          label="Time"
          variant="outlined"
          onChange={props.onSearchChangeTime}
          required
        >
          {TimeData.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.time}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </React.Fragment>
  );
};
export default InputSchedule;
