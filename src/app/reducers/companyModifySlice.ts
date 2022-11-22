import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 회사소개 변경

/**
 * introduce : 인사말
 * history : 회사 연혁
 * historyPreview : 회사 연혁 이미지
 * orgChart : 조직도
 * orgChartPreview : 조직도 이미지
 * ci : CI 소개
 * ciPreview : 챠 소개 이미지
 * companyImage : CI소개, 회사연혁, 조직도 이미지 / 미리보기 path
 */

/**
 * getCompanyImage : CI소개, 회사연혁, 조직도 이미지 가져오기
 * getHistoryImage : 회사 연혁 업데이트
 * getCompanyInfoImage : CI소개 업데이트
 * getOrgChartImage : 조직도 업데이트
 * updateIntroduce : 인사말 수정
 * updateHistory : 회사 연혁 수정
 * updateOrgChart : 조직도 수정
 * updateCompanyInfo : CI 소개 수정
 */

interface modeInitialState {
  introduce: { newIntroduce: string },
  companyImage: {
    compInfoImage: { file: string, path: string, serverFilename: string },
    historyImage: { id: number, savedPath: string, originalFilename: string, serverFilename: string }[],
    orgChartImage: { file: string, path: string, serverFilename: string }
  }
}

const CompanyModifyInitialState: modeInitialState = {
  introduce: {newIntroduce: ''},
  companyImage: {
    compInfoImage: {file: '', path: '', serverFilename: ''},
    historyImage: [],
    orgChartImage: {file: '', path: '', serverFilename: ''}
  }
};

export const ModeSlice = createSlice({
  name: 'companyModify',
  initialState: CompanyModifyInitialState,
  reducers: {
    getCompanyImage: (
      state,
      action: PayloadAction<{
        data: {
          bannerImages: [
            {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            }
          ],
          compInfoImage: string,
          historyImage: {
            id: number,
            originalFilename: string,
            savedPath: string,
            serverFilename: string
          }[],
          logoImage: {
            id: 0,
            originalFilename: string,
            savedPath: string,
            serverFilename: string
          },
          orgChartImage: string
        }
      }>
    ) => {
      state.companyImage = {
        compInfoImage: {file: '', path: '', serverFilename: action.payload.data.compInfoImage},
        historyImage: action.payload.data.historyImage,
        orgChartImage: {file: '', path: '', serverFilename: action.payload.data.orgChartImage}
      };
    },
    getHistoryImage: (
      state,
      action: PayloadAction<{ historyImage: { id: number, savedPath: string, originalFilename: string, serverFilename: string }[] }>
    ) => {
      state.companyImage.historyImage = action.payload.historyImage;
    },
    getCompanyInfoImage: (
      state,
      action: PayloadAction<{ companyInfoImage: string }>
    ) => {
      state.companyImage.compInfoImage = {file: '', path: '', serverFilename: action.payload.companyInfoImage};
    },
    getOrgChartImage: (
      state,
      action: PayloadAction<{ orgChartImage: string }>
    ) => {
      state.companyImage.orgChartImage = {file: '', path: '', serverFilename: action.payload.orgChartImage};
    },
    updateIntroduce: (
      state,
      action: PayloadAction<{ newIntroduce: string }>
    ) => {
      state.introduce.newIntroduce = action.payload.newIntroduce
    },
    updateOrgChart: (
      state,
      action: PayloadAction<{ file: string, path: string }>
    ) => {
      state.companyImage.orgChartImage = {
        ...state.companyImage.orgChartImage,
        file: action.payload.file,
        path: action.payload.path
      };
    },
    updateCompanyInfo: (
      state,
      action: PayloadAction<{ file: string, path: string }>
    ) => {
      state.companyImage.compInfoImage = {
        ...state.companyImage.orgChartImage,
        file: action.payload.file,
        path: action.payload.path
      };
    },
    deleteHistory: (
      state,
        action: PayloadAction<{ num: number }>
    ) => {
      state.companyImage.historyImage = state.companyImage.historyImage.filter((item, index) => index !== action.payload.num);
    }
  }
});

export const {
  getCompanyImage,
  getHistoryImage,
  getCompanyInfoImage,
  getOrgChartImage,
  updateIntroduce,
  updateOrgChart,
  updateCompanyInfo,
  deleteHistory
} = ModeSlice.actions;
export default ModeSlice.reducer;