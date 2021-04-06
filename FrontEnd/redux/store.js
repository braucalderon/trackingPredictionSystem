import { configureStore } from '@reduxjs/toolkit';
import subMenuReducer from './reducer';

export default configureStore({
  reducer: {
    subMenu: subMenuReducer,
  },
});