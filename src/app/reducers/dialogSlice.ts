import { createSlice } from "@reduxjs/toolkit";

// dialog state
interface dialogInitialState {
  cancel: boolean
};

const DialogInitialState: dialogInitialState = {
  cancel: false
};

// dialog 닫기
export const DialogSlice = createSlice({
  name: 'dialog',
  initialState: DialogInitialState,
  reducers: {
    clickGoBack: (state) => { state.cancel = !state.cancel }
  }
});

export const { clickGoBack } = DialogSlice.actions;
export default DialogSlice.reducer;