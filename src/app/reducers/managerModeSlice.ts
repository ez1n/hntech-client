import { createSlice } from "@reduxjs/toolkit";

// 관리자모드 state (임시)
interface managerInitialState {
  managerLogin: boolean,
  managerMode: boolean,
  changeInfo: boolean
};

const ManagerInitialState: managerInitialState = {
  managerLogin: false,
  managerMode: false,
  changeInfo: false
};

// 관리자 모드 업데이트
export const ManagerSlice = createSlice({
  name: 'mode',
  initialState: ManagerInitialState,
  reducers: {
    clickManagerLogin: (state) => { state.managerLogin = !(state.managerLogin) },
    clickChangeMode: (state) => { state.managerMode = !(state.managerMode) },
    clickChangeInfo: (state) => { state.changeInfo = !(state.changeInfo) }
  }
});

export const { clickManagerLogin, clickChangeMode, clickChangeInfo } = ManagerSlice.actions;
export default ManagerSlice.reducer;