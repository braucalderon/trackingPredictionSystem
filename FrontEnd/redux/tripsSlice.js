import { createSlice } from '@reduxjs/toolkit';

export const tripsSlice = createSlice({
    name: 'trips',
    initialState: {
        stopId: '',
    },
    reducers: {
        onClickStateStopId: (state, action) => {
            state.time = action.payload;
        }

    }

});
export const { onClickStateStopId } = tripsSlice.actions;

export const selectStopId = state => state.trips.stopId;

export default tripsSlice.reducer;