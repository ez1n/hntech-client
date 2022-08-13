import { Password } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 관리자 정보 / 페이지 관리

/**
 * managerLogin : 관리자 로그인 dialog
 * managerMode : 관리자 모드 on / off
 * managerData : 관리자 정보
 */

/**
 * setManagerData : 관리자 정보 받아오기
 * updateManagerPassword : 비밀번호 업데이트
 * updateManagerSentMail : 발신 메일 업데이트
 * updateManagerReceivedMail : 수신 메일 업데이트
 * updateManagerTime : 메일 발송 시간 업데이트
 */

// 관리자모드 state (임시)
interface managerInitialState {
  managerLogin: boolean,
  managerMode: boolean,
  managerData: { password: string, sentMail: string, receivedMail: string, time: string }
};

const ManagerInitialState: managerInitialState = {
  managerLogin: false,
  managerMode: false,
  managerData: { password: '', sentMail: '', receivedMail: '', time: '' }
};

// 관리자 모드 업데이트
export const ManagerSlice = createSlice({
  name: 'manager',
  initialState: ManagerInitialState,
  reducers: {
    clickManagerLogin: (state) => { state.managerLogin = !(state.managerLogin) },
    clickChangeMode: (state) => { state.managerMode = !(state.managerMode) },
    setManagerData: (
      state,
      action: PayloadAction<{ data: { password: string, sentMail: string, receivedMail: string, time: string } }>
    ) => {
      state.managerData.password = action.payload.data.password;
      state.managerData.sentMail = action.payload.data.sentMail;
      state.managerData.receivedMail = action.payload.data.receivedMail;
      state.managerData.time = action.payload.data.time;
    },
    updateManagerPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.managerData.password = action.payload.password },
    updateManagerSentMail: (
      state,
      action: PayloadAction<{ sentMail: string }>
    ) => { state.managerData.sentMail = action.payload.sentMail },
    updateManagerReceivedMail: (
      state,
      action: PayloadAction<{ receivedMail: string }>
    ) => { state.managerData.receivedMail = action.payload.receivedMail },
    updateManagerTime: (
      state,
      action: PayloadAction<{ time: string }>
    ) => { state.managerData.time = action.payload.time }
  }
});

export const {
  clickManagerLogin,
  clickChangeMode,
  setManagerData,
  updateManagerPassword,
  updateManagerSentMail,
  updateManagerReceivedMail,
  updateManagerTime } = ManagerSlice.actions;
export default ManagerSlice.reducer;