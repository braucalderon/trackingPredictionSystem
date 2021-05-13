import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    lat: -77.0353,
    lon: 38.8895,
    zoom: 8,
    instruction: true,
   
  },
  reducers: {
    onClickCoordinates: (state, action) => {
      state.lat = action.payload[0];
      state.lon = action.payload[1];
      state.zoom = 16;
      state.instruction = true;
      // console.log(action.payload[0]);
      // console.log(action.payload[1]);
    },
    onClickResetCoordinates: (state) => {
      state.lat = -77.0353;
      state.lon = 38.8895;
      state.zoom = 8;
      state.instruction = false;
    },
    onClickShowInstructions: (state) => {
      state.instruction = true;
    }
  },
});

export const {
  onClickCoordinates,
  onClickResetCoordinates,
  onClickShowInstructions,
} = scheduleSlice.actions;

export const selectLat = (state) => state.schedule.lat;
export const selectLon = (state) => state.schedule.lon;
export const selectZoom = (state) => state.schedule.zoom;
export const selectInstruction = (state) => state.schedule.instruction;

export default scheduleSlice.reducer;
