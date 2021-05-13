import { createSlice } from '@reduxjs/toolkit';

export const subMenuSlice = createSlice({
    name: 'subMenu',
    initialState: {
        value: null,
        booleanState: false,
        errorMessage: true,
        
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
        onClickStateErrorButton: (state) => {
            state.errorMessage = false;
           
        }
     
    }
});
export const { onClickStateBoolean, onClickState, onClickStateErrorButton } = subMenuSlice.actions;

export const selectChange = state => state.subMenu.value;
export const selectBoolean = state => state.subMenu.booleanState;

export default subMenuSlice.reducer;