import { createSlice } from "@reduxjs/toolkit";

interface managerInitialState {
  managerMode: boolean
};

const ManagerInitialState: managerInitialState = {
  managerMode: false
};

export const ManagerSlice = createSlice({
  name: 'mode',
  initialState: ManagerInitialState,
  reducers: {
    clickChangeMode: (state) => { state.managerMode = !(state.managerMode) }
  }
});

export const { clickChangeMode } = ManagerSlice.actions;
export default ManagerSlice.reducer;