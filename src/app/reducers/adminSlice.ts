import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 관리자 정보 / 페이지 관리

/**
 * managerLogin : 관리자 로그인 dialog
 * password : 관리자 비밀번호 (로그인)
 * panelData : 관리자 패널 정보
 * newPanelData : 관리자 패널 정보 변경
 * updatePassword: 관리자 비밀번호 (변경)
 */

/**
 * ChangeMode : 관리자모드 state (boolean)
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
interface adminInitialState {
  managerMode: boolean,
  password: { password: string },
  panelData: {
    adminPassword: string,
    emailSendingTime: string,
    footer: {
      address: string,
      afterService: string,
      fax: string,
      phone: string,
      sites: { id: number, buttonName: string, link: string } []
    },
    receiveEmailAccount: string,
    sendEmailAccount: string,
    sendEmailPassword: string,
    taxOriginalFilename: string
  },
  newPanelData: {
    address: string,
    afterService: string,
    emailSendingTime: string,
    fax: string,
    phone: string,
    receiveEmailAccount: string,
    sendEmailAccount: string,
    sendEmailPassword: string,
    sites: { id: number, buttonName: string, link: string }[]
  },
  footer: {
    address: string,
    afterService: string,
    fax: string,
    phone: string,
    sites: { id: number, buttonName: string, link: string }[]
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
  copyBanner: {
    id: number,
    originalFilename: string,
    savedPath: string,
    serverFilename: string
  }[],
  bannerFile: { file: string, name: string }[],
  document: {
    catalogOriginalFilename: string,
    catalogServerFilename: string,
    materialOriginalFilename: string,
    materialServerFilename: string,
    taxOriginalFilename: string,
    taxServerFilename: string
  },
  documentFile: {
    catalog: { file: string, name: string },
    approval: { file: string, name: string },
    tax: { file: string, name: string }
  }
}

const AdminInitialState: adminInitialState = {
  managerMode: false,
  password: {password: ''},
  panelData: {
    adminPassword: '',
    emailSendingTime: '',
    footer: {
      address: '',
      afterService: '',
      fax: '',
      phone: '',
      sites: []
    },
    receiveEmailAccount: '',
    sendEmailAccount: '',
    sendEmailPassword: '',
    taxOriginalFilename: ''
  },
  newPanelData: {
    emailSendingTime: '',
    address: '',
    afterService: '',
    fax: '',
    phone: '',
    receiveEmailAccount: '',
    sendEmailAccount: '',
    sendEmailPassword: '',
    sites: []
  },
  footer: {
    address: '',
    afterService: '',
    fax: '',
    phone: '',
    sites: []
  },
  updatePassword: {curPassword: '', newPassword: '', newPasswordCheck: ''},
  logo: {
    id: 0,
    originalFilename: '',
    savedPath: '',
    serverFilename: ''
  },
  logoFile: {file: '', name: ''},
  banner: [],
  copyBanner: [],
  bannerFile: [],
  document: {
    catalogOriginalFilename: '',
    materialOriginalFilename: '',
    catalogServerFilename: '',
    materialServerFilename: '',
    taxOriginalFilename: '',
    taxServerFilename: ''
  },
  documentFile: {
    catalog: {file: '', name: ''},
    approval: {file: '', name: ''},
    tax: {file: '', name: ''}
  }
};

// 관리자 모드 업데이트
export const AdminSlice = createSlice({
  name: 'manager',
  initialState: AdminInitialState,
  reducers: {
    changeMode: (
      state,
      action: PayloadAction<{ login: string | null }>
    ) => {
      state.managerMode = Boolean(action.payload.login);
    },
    setPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => {
      state.password.password = action.payload.password
    },
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
            phone: string,
            sites: { id: number, buttonName: string, link: string }[]
          },
          receiveEmailAccount: string,
          sendEmailAccount: string,
          sendEmailPassword: string,
          taxOriginalFilename: string
        }
      }>
    ) => {
      state.panelData = action.payload.panelData;
    },
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
            phone: string,
            sites: { id: number, buttonName: string, link: string }[]
          },
          receiveEmailAccount: string,
          sendEmailAccount: string,
          sendEmailPassword: string,
          taxOriginalFilename: string
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
        sendEmailPassword: action.payload.panelData.sendEmailPassword,
        sites: action.payload.panelData.footer.sites
      }
    },
    setFooter: (
      state,
      action: PayloadAction<{
        footer: {
          address: string,
          afterService: string,
          fax: string,
          phone: string,
          sites: []
        }
      }>
    ) => {
      state.footer = action.payload.footer
    },
    updateCurPassword: (
      state,
      action: PayloadAction<{ curPassword: string }>
    ) => {
      state.updatePassword.curPassword = action.payload.curPassword
    },
    updateNewPassword: (
      state,
      action: PayloadAction<{ newPassword: string }>
    ) => {
      state.updatePassword.newPassword = action.payload.newPassword
    },
    updateNewPasswordCheck: (
      state,
      action: PayloadAction<{ newPasswordCheck: string }>
    ) => {
      state.updatePassword.newPasswordCheck = action.payload.newPasswordCheck
    },
    updateManagerPassword: (
      state,
      action: PayloadAction<{ adminPassword: string }>
    ) => {
      state.panelData.adminPassword = action.payload.adminPassword
    },
    updateManagerSentMail: (
      state,
      action: PayloadAction<{ sendEmailAccount: string }>
    ) => {
      state.newPanelData.sendEmailAccount = action.payload.sendEmailAccount
    },
    updateManagerReceivedMail: (
      state,
      action: PayloadAction<{ receiveEmailAccount: string }>
    ) => {
      state.newPanelData.receiveEmailAccount = action.payload.receiveEmailAccount
    },
    updateManagerTime: (
      state,
      action: PayloadAction<{ emailSendingTime: string }>
    ) => {
      state.newPanelData.emailSendingTime = action.payload.emailSendingTime
    },
    updateManagerSendEmailPassword: (
      state,
      action: PayloadAction<{ sendEmailPassword: string }>
    ) => {
      state.newPanelData.sendEmailPassword = action.payload.sendEmailPassword
    },
    updateAddress: (
      state,
      action: PayloadAction<{ address: string }>
    ) => {
      state.newPanelData.address = action.payload.address
    },
    updateAfterService: (
      state,
      action: PayloadAction<{ afterService: string }>
    ) => {
      state.newPanelData.afterService = action.payload.afterService
    },
    updateFax: (
      state,
      action: PayloadAction<{ fax: string }>
    ) => {
      state.newPanelData.fax = action.payload.fax
    },
    updatePhone: (
      state,
      action: PayloadAction<{ phone: string }>
    ) => {
      state.newPanelData.phone = action.payload.phone
    },
    setLogo: (
      state,
      action: PayloadAction<{
        logo: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }
      }>) => {
      state.logo = action.payload.logo
    },
    addLogoFile: (
      state,
      action: PayloadAction<{ logo: { file: string, name: string } }>
    ) => {
      state.logoFile = action.payload.logo
    },
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
    ) => {
      state.banner = action.payload.banner;
      state.copyBanner = action.payload.banner;
    },
    addBannerFile: (
      state,
      action: PayloadAction<{ banner: { file: string, name: string } }>
    ) => {
      state.bannerFile = [...state.bannerFile, action.payload.banner];
    },
    resetBannerFile: (state) => {
      state.bannerFile = []
    },
    deleteOriginBanner: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      state.copyBanner = state.copyBanner.filter((item, index) => index !== action.payload.num);
    },
    deleteBanner: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      state.bannerFile = state.bannerFile.filter((item, index) => index !== action.payload.num);
    },
    setDocument: (
      state,
      action: PayloadAction<{
        document: {
          catalogOriginalFilename: string,
          catalogServerFilename: string,
          materialOriginalFilename: string,
          materialServerFilename: string,
          taxOriginalFilename: string,
          taxServerFilename: string
        }
      }>
    ) => {
      state.document = action.payload.document
    },
    resetDocumentFile: state => {
      state.documentFile = {
        catalog: {file: '', name: ''},
        approval: {file: '', name: ''},
        tax: {file: '', name: ''}
      }
    },
    addCatalog: (
      state,
      action: PayloadAction<{ catalog: { file: string, name: string } }>
    ) => {
      state.documentFile.catalog = action.payload.catalog
    },
    addApproval: (
      state,
      action: PayloadAction<{ approval: { file: string, name: string } }>
    ) => {
      state.documentFile.approval = action.payload.approval
    },
    addTax: (
      state,
      action: PayloadAction<{ tax: { file: string, name: string } }>
    ) => {
      state.documentFile.tax = action.payload.tax
    },
    addSitesUploadButton: state => {
      const siteLen = state.newPanelData.sites['length'];
      if (siteLen === 0) {
        state.newPanelData.sites = [{id: 0, buttonName: '', link: ''}];
      } else {
        state.newPanelData.sites = [...state.newPanelData.sites, {
          id: state.newPanelData.sites[siteLen - 1].id + 1,
          buttonName: '',
          link: ''
        }];
      }
    },
    deleteSitesUploadButton: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      state.newPanelData.sites = state.newPanelData.sites.filter((item, index) => index !== action.payload.index);
    },
    updateSiteButtonName: (
      state,
      action: PayloadAction<{ buttonName: string, index: number }>
    ) => {
      state.newPanelData.sites = state.newPanelData.sites.map((item, index) => {
        if (index === action.payload.index) {
          return {...item, buttonName: action.payload.buttonName}
        }
        return item;
      })
    },
    updateSiteLink: (
      state,
      action: PayloadAction<{ link: string, index: number }>
    ) => {
      state.newPanelData.sites = state.newPanelData.sites.map((item, index) => {
        if (index === action.payload.index) {
          return {...item, link: action.payload.link}
        }
        return item;
      })
    }
  }
});

export const {
  changeMode,
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
  resetBannerFile,
  deleteOriginBanner,
  deleteBanner,
  setDocument,
  addCatalog,
  addApproval,
  addTax,
  addSitesUploadButton,
  deleteSitesUploadButton,
  updateSiteButtonName,
  updateSiteLink,
  resetDocumentFile
} = AdminSlice.actions;
export default AdminSlice.reducer;