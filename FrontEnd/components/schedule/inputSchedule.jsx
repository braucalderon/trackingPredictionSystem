import React from "react";

const InputSchedule = (props) => {
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label
          style={{
            fontFamily: "serif",
            fontSize: "3vh",
          }}
        >
          Schedules:
        </label>
        <label
          style={{
            fontFamily: "serif",
            fontSize: "3vh",
            marginRight: "15%",
          }}
        >
          Time:
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          style={{
            width: "60%",
            fontFamily: "serif",
            height: "4vh",
            fontSize: "2.5vh",
            textAlign: "center",
            borderRadius: "1vh",
          }}
          type="search"
          placeholder="Stop Name"
          onChange={props.onSearchChange}
        />
        <input
          style={{
            width: "25%",
            fontFamily: "serif",
            height: "4vh",
            fontSize: "2.5vh",
            textAlign: "center",
            borderRadius: "1vh",
            marginRight: "9%",
          }}
          type="number"
          max="12"
          min="0"
          placeholder="Time"
          onChange={props.onSearchChangeTime}
        />
      </div>
    </React.Fragment>
  );
};
export default InputSchedule;
