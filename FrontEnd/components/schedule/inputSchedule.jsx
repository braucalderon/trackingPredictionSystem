import React from "react";
import { MenuItem, TextField } from "@material-ui/core";
import TimeData from "./scheduleTimeData.js";

const InputSchedule = (props) => {
  // const menuf = useRef(null);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        style={{ width: "55%" }}
        id="outlined-basic"
        label="Stop Location"
        variant="outlined"
        size="small"
        onChange={props.onSearchChange}
        required
      />
      <TextField
        style={{ width: "35%" }}
        select
        id="standard-number"
        size="small"
        type="number"
        value={props.time}
        label="Time"
        defaultValue="0"
        variant="outlined"
        onChange={props.onSearchChangeTime}
      >
        {TimeData.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.time}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
export default InputSchedule;
