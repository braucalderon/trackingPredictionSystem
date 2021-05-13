import { configureStore } from '@reduxjs/toolkit';
import subMenuSlice from './subMenuSlice';
import scheduleSlice from './scheduleSlice';
import tripsSlice from './tripsSlice';

// can add more slices in the store by importing them
// https://redux.js.org/tutorials/essentials/part-4-using-data
export default configureStore({
  reducer: {
    subMenu: subMenuSlice,
    schedule: scheduleSlice,
    trips: tripsSlice
  },
});