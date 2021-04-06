import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'subMenu',
    initialState: {
        value: null
    },
    reducers: {
        changeState: (state, action) => {
            state.value = action.payload;
        }
    }
});
export const {changeState} = slice.actions;

export const selectChange = state => state.subMenu.val;

export default slice.reducer;