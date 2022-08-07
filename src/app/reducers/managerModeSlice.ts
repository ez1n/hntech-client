import { createSlice } from "@reduxjs/toolkit";

// 관리자모드 state (임시)
interface managerInitialState {
  managerMode: boolean,
  managerLogin: boolean
};

const ManagerInitialState: managerInitialState = {
  managerMode: false,
  managerLogin: false
};

// 관리자 모드 업데이트
export const ManagerSlice = createSlice({
  name: 'mode',
  initialState: ManagerInitialState,
  reducers: {
    clickManagerLogin: (state) => { state.managerLogin = !(state.managerLogin) },
    clickChangeMode: (state) => { state.managerMode = !(state.managerMode) }
  }
});

export const { clickManagerLogin, clickChangeMode } = ManagerSlice.actions;
export default ManagerSlice.reducer;