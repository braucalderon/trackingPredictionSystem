import { createSlice } from '@reduxjs/toolkit';

export const subMenuSlice = createSlice({
    name: 'subMenu',
    initialState: {
        value: null,
        booleanState: false,
        
    },
    reducers: {
        onClickState: (state, action) => {
            state.value = action.payload;
            state.booleanState = true;
        },
        // close the modal based on boolean
        onClickStateBoolean: state => {
            state.booleanState = false;
        },
        
        
    }
});
export const {onClickStateBoolean, onClickState} = subMenuSlice.actions;

export const selectChange = state => state.subMenu.value;
export const selectBoolean = state => state.subMenu.booleanState;

export default subMenuSlice.reducer;