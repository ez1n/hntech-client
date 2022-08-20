import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 관리자 정보 / 페이지 관리

/**
 * managerLogin : 관리자 로그인 dialog
 * managerMode : 관리자 모드 on / off
 * mail : 관리자 정보
 * footer: footer 정보
 */

/**
 * setManagerData : 관리자 정보 받아오기
 * updateManagerPassword : 비밀번호 업데이트
 * updateManagerMail : 이메일 업데이트
 * updateManagerTime : 메일 발송 시간 업데이트
 * setFooter : footer 정보 받아오기
 * updateAddress : 본사 주소 업데이트
 * updateAfterService : as 업데이트
 * updateFax : fax 업데이트
 * updatePhone : 본사 번호 업데이트
 */

// 관리자모드 state (임시)
interface managerInitialState {
  managerLogin: boolean,
  managerMode: boolean,
  password: { password: string },
  mail: { password: string, email: string, time: string },
  footer: { address: string, afterService: string, fax: string, phone: string }
};

const ManagerInitialState: managerInitialState = {
  managerLogin: false,
  managerMode: false,
  password: { password: '' },
  mail: { password: '', email: '', time: '' },
  footer: { address: '', afterService: '', fax: '', phone: '' }
};

// 관리자 모드 업데이트
export const ManagerSlice = createSlice({
  name: 'manager',
  initialState: ManagerInitialState,
  reducers: {
    clickManagerLogin: (state) => { state.managerLogin = !(state.managerLogin) },
    clickChangeMode: (state) => { state.managerMode = !(state.managerMode) },
    setPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.password.password = action.payload.password },
    setManagerData: (
      state,
      action: PayloadAction<{ data: { password: string, email: string, time: string } }>
    ) => {
      state.mail.password = action.payload.data.password;
      state.mail.email = action.payload.data.email;
      state.mail.time = action.payload.data.time;
    },
    updateManagerPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.mail.password = action.payload.password },
    updateManagerEmail: (
      state,
      action: PayloadAction<{ email: string }>
    ) => { state.mail.email = action.payload.email },
    updateManagerTime: (
      state,
      action: PayloadAction<{ time: string }>
    ) => { state.mail.time = action.payload.time },
    setFooter: (
      state,
      action: PayloadAction<{ footer: { address: string, afterService: string, fax: string, phone: string } }>
    ) => { state.footer = action.payload.footer },
    updateAddress: (
      state,
      action: PayloadAction<{ address: string }>
    ) => { state.footer.address = action.payload.address },
    updateAfterService: (
      state,
      action: PayloadAction<{ afterService: string }>
    ) => { state.footer.afterService = action.payload.afterService },
    updateFax: (
      state,
      action: PayloadAction<{ fax: string }>
    ) => { state.footer.fax = action.payload.fax },
    updatePhone: (
      state,
      action: PayloadAction<{ phone: string }>
    ) => { state.footer.phone = action.payload.phone },
  }
});

export const {
  clickManagerLogin,
  clickChangeMode,
  setPassword,
  setManagerData,
  updateManagerPassword,
  updateManagerEmail,
  updateManagerTime,
  setFooter,
  updateAddress,
  updateAfterService,
  updateFax,
  updatePhone } = ManagerSlice.actions;
export default ManagerSlice.reducer;