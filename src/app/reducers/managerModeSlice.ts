import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 관리자 정보 / 페이지 관리

/**
 * managerLogin : 관리자 로그인 dialog
 * password : 관리자 비밀번호 (로그인)
 * panelData : 관리자 패널 정보
 * newPanelData : 관리자 패널 정보 변경
 * updatePassword: 관리자 비밀번호 (변경)
 */

/**
 * clickChangeMode : 관리자모드 state (boolean)
 * setPassword : 비밀번호 입력(관리자 로그인)
 * setManagerData : 관리자 정보 받아오기
 * copyManagerData : 관리자 정보 copy (변경용)
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

// 관리자모드 state
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
  newPanelData: {
    emailSendingTime: string,
    address: string,
    afterService: string,
    fax: string,
    phone: string,
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
  updatePassword: { curPassword: string, newPassword: string, newPasswordCheck: string },
  logo: {
    id: number,
    originalFilename: string,
    savedPath: string,
    serverFilename: string
  },
  logoFile: { file: string, name: string },
  banner: {
    id: number,
    originalFilename: string,
    savedPath: string,
    serverFilename: string
  }[],
  bannerFile: { file: string, name: string }[]
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
  newPanelData: {
    emailSendingTime: '',
    address: '',
    afterService: '',
    fax: '',
    phone: '',
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
  updatePassword: { curPassword: '', newPassword: '', newPasswordCheck: '' },
  logo: {
    id: 0,
    originalFilename: '',
    savedPath: '',
    serverFilename: ''
  },
  logoFile: { file: '', name: '' },
  banner: [],
  bannerFile: []
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
    copyManagerData: (
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
    ) => {
      state.newPanelData = {
        emailSendingTime: action.payload.panelData.emailSendingTime,
        address: action.payload.panelData.footer.address,
        afterService: action.payload.panelData.footer.afterService,
        fax: action.payload.panelData.footer.fax,
        phone: action.payload.panelData.footer.phone,
        receiveEmailAccount: action.payload.panelData.receiveEmailAccount,
        sendEmailAccount: action.payload.panelData.sendEmailAccount,
        sendEmailPassword: action.payload.panelData.sendEmailPassword
      }
    },
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
    ) => { state.newPanelData.sendEmailAccount = action.payload.sendEmailAccount },
    updateManagerReceivedMail: (
      state,
      action: PayloadAction<{ receiveEmailAccount: string }>
    ) => { state.newPanelData.receiveEmailAccount = action.payload.receiveEmailAccount },
    updateManagerTime: (
      state,
      action: PayloadAction<{ emailSendingTime: string }>
    ) => { state.newPanelData.emailSendingTime = action.payload.emailSendingTime },
    updateManagerSendEmailPassword: (
      state,
      action: PayloadAction<{ sendEmailPassword: string }>
    ) => { state.newPanelData.sendEmailPassword = action.payload.sendEmailPassword },
    updateAddress: (
      state,
      action: PayloadAction<{ address: string }>
    ) => { state.newPanelData.address = action.payload.address },
    updateAfterService: (
      state,
      action: PayloadAction<{ afterService: string }>
    ) => { state.newPanelData.afterService = action.payload.afterService },
    updateFax: (
      state,
      action: PayloadAction<{ fax: string }>
    ) => { state.newPanelData.fax = action.payload.fax },
    updatePhone: (
      state,
      action: PayloadAction<{ phone: string }>
    ) => { state.newPanelData.phone = action.payload.phone },
    setLogo: (
      state,
      action: PayloadAction<{
        logo: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }
      }>) => { state.logo = action.payload.logo },
    addLogoFile: (
      state,
      action: PayloadAction<{ logo: { file: string, name: string } }>
    ) => { state.logoFile = action.payload.logo },
    setBanner: (
      state,
      action: PayloadAction<{
        banner: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }[]
      }>
    ) => { state.banner = action.payload.banner },
    addBannerFile: (
      state,
      action: PayloadAction<{ banner: { file: string, name: string } }>
    ) => {
      const newBanner = [...state.bannerFile, action.payload.banner];
      state.bannerFile = newBanner;
    },
    deleteOriginBanner: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newBanner = state.banner.filter((item, index) => index !== action.payload.num);
      state.banner = newBanner;
    },
    deleteBanner: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newBanner = state.bannerFile.filter((item, index) => index !== action.payload.num);
      state.bannerFile = newBanner;
    }
  }
});

export const {
  clickChangeMode,
  setPassword,
  setManagerData,
  copyManagerData,
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
  updatePhone,
  setLogo,
  addLogoFile,
  setBanner,
  addBannerFile,
  deleteOriginBanner,
  deleteBanner } = ManagerSlice.actions;
export default ManagerSlice.reducer;