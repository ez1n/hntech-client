import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 관리자 정보 / 페이지 관리

/**
 * managerLogin : 관리자 로그인 dialog
 * password : 관리자 비밀번호 (로그인)
 * panelData : 관리자 정보
 * updatePassword: 관리자 비밀번호 (변경)
 */

/**
 * clickChangeMode : 관리자모드 state (boolean)
 * setPassword : 비밀번호 입력(관리자 로그인)
 * setManagerData : 관리자 정보 받아오기
 * setFooter : footer 정보 받아오기
 * updateCurPassword : 관리자 현재 비밀번호 수정
 * updateNewPassword : 관리자 새 비밀번호
 * updateNewPasswordCheck : 관리자 새 비밀번호 확인
 * updateManagerPassword : 비밀번호 업데이트
 * updateManagerSentMail : 수신 메일 업데이트
 * updateManagerReceivedMail : 발신 메일 업데이트
 * updateManagerTime : 메일 발송 시간 업데이트
 * updateAddress : 본사 주소 업데이트
 * updateAfterService : as 업데이트
 * updateFax : fax 업데이트
 * updatePhone : 본사 번호 업데이트
 */

// 관리자모드 state (임시)
interface managerInitialState {
  managerMode: boolean,
  password: { password: string },
  panelData: {
    adminPassword: string,
    emailSendingTime: string,
    footer: {
      address: string,
      afterService: string,
      fax: string,
      phone: string
    },
    receiveEmailAccount: string,
    sendEmailAccount: string,
    sendEmailPassword: string
  },
  footer: {
    address: string,
    afterService: string,
    fax: string,
    phone: string
  },
  updatePassword: { curPassword: string, newPassword: string, newPasswordCheck: string }
};

const ManagerInitialState: managerInitialState = {
  managerMode: false,
  password: { password: '' },
  panelData: {
    adminPassword: '',
    emailSendingTime: '',
    footer: {
      address: '',
      afterService: '',
      fax: '',
      phone: ''
    },
    receiveEmailAccount: '',
    sendEmailAccount: '',
    sendEmailPassword: ''
  },
  footer: {
    address: '',
    afterService: '',
    fax: '',
    phone: ''
  },
  updatePassword: { curPassword: '', newPassword: '', newPasswordCheck: '' }
};

// 관리자 모드 업데이트
export const ManagerSlice = createSlice({
  name: 'manager',
  initialState: ManagerInitialState,
  reducers: {
    clickChangeMode: (state) => { state.managerMode = !(state.managerMode) },
    setPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.password.password = action.payload.password },
    setManagerData: (
      state,
      action: PayloadAction<{
        panelData: {
          adminPassword: string,
          emailSendingTime: string,
          footer: {
            address: string,
            afterService: string,
            fax: string,
            phone: string
          },
          receiveEmailAccount: string,
          sendEmailAccount: string,
          sendEmailPassword: string
        }
      }>
    ) => { state.panelData = action.payload.panelData },
    setFooter: (
      state,
      action: PayloadAction<{
        footer: {
          address: string,
          afterService: string,
          fax: string,
          phone: string
        }
      }>
    ) => { state.footer = action.payload.footer },
    updateCurPassword: (
      state,
      action: PayloadAction<{ curPassword: string }>
    ) => { state.updatePassword.curPassword = action.payload.curPassword },
    updateNewPassword: (
      state,
      action: PayloadAction<{ newPassword: string }>
    ) => { state.updatePassword.newPassword = action.payload.newPassword },
    updateNewPasswordCheck: (
      state,
      action: PayloadAction<{ newPasswordCheck: string }>
    ) => { state.updatePassword.newPasswordCheck = action.payload.newPasswordCheck },
    updateManagerPassword: (
      state,
      action: PayloadAction<{ adminPassword: string }>
    ) => { state.panelData.adminPassword = action.payload.adminPassword },
    updateManagerSentMail: (
      state,
      action: PayloadAction<{ sendEmailAccount: string }>
    ) => { state.panelData.sendEmailAccount = action.payload.sendEmailAccount },
    updateManagerReceivedMail: (
      state,
      action: PayloadAction<{ receiveEmailAccount: string }>
    ) => { state.panelData.receiveEmailAccount = action.payload.receiveEmailAccount },
    updateManagerTime: (
      state,
      action: PayloadAction<{ emailSendingTime: string }>
    ) => { state.panelData.emailSendingTime = action.payload.emailSendingTime },
    updateManagerSendEmailPassword: (
      state,
      action: PayloadAction<{ sendEmailPassword: string }>
    ) => { state.panelData.sendEmailPassword = action.payload.sendEmailPassword },
    updateAddress: (
      state,
      action: PayloadAction<{ address: string }>
    ) => { state.panelData.footer.address = action.payload.address },
    updateAfterService: (
      state,
      action: PayloadAction<{ afterService: string }>
    ) => { state.panelData.footer.afterService = action.payload.afterService },
    updateFax: (
      state,
      action: PayloadAction<{ fax: string }>
    ) => { state.panelData.footer.fax = action.payload.fax },
    updatePhone: (
      state,
      action: PayloadAction<{ phone: string }>
    ) => { state.panelData.footer.phone = action.payload.phone },
  }
});

export const {
  clickChangeMode,
  setPassword,
  setManagerData,
  setFooter,
  updateCurPassword,
  updateNewPassword,
  updateNewPasswordCheck,
  updateManagerPassword,
  updateManagerSentMail,
  updateManagerReceivedMail,
  updateManagerTime,
  updateManagerSendEmailPassword,
  updateAddress,
  updateAfterService,
  updateFax,
  updatePhone } = ManagerSlice.actions;
export default ManagerSlice.reducer;