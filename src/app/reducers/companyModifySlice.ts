import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 회사소개 변경

/**
 * introduce : 인사말
 * history : 회사 연혁
 * historyPreview : 회사 연혁 이미지
 * orgChart : 조직도
 * orgChartPreview : 조직도 이미지
 * ci : CI 소개
 * ciPreview : 챠 소개 이미지
 */

/**
 * updateIntroduce : 인사말 수정
 * updateHistory : 회사 연혁 수정
 * previewHistory : 회사 연혁 미리보기
 * updateOrgChart : 조직도 수정
 * previewOrgChart : 조직도 미리보기
 * updateCompanyInfo : CI 소개 수정
 * previewCompanyInfo : CI 소개 미리보기
 */

interface modeInitialState {
  introduce: { newIntroduce: string },
  history: { updatedServerFilename: string, where: string },
  historyPreview: string,
  orgChart: { updatedServerFilename: string, where: string },
  orgChartPreview: string,
  ci: { updatedServerFilename: string, where: string },
  ciPreview: string
};

const CompanyModifyInitialState: modeInitialState = {
  introduce: { newIntroduce: '' },
  history: { updatedServerFilename: '', where: 'companyHistory' },
  historyPreview: '',
  orgChart: { updatedServerFilename: '', where: 'orgChart' },
  orgChartPreview: '',
  ci: { updatedServerFilename: '', where: 'ci' },
  ciPreview: '',
};

export const ModeSlice = createSlice({
  name: 'companyModify',
  initialState: CompanyModifyInitialState,
  reducers: {
    updateIntroduce: (
      state,
      action: PayloadAction<{ newIntroduce: string }>
    ) => { state.introduce.newIntroduce = action.payload.newIntroduce },
    updateHistory: (
      state,
      action: PayloadAction<{ history: string }>
    ) => { state.history.updatedServerFilename = action.payload.history },
    previewHistory: (
      state,
      action: PayloadAction<{ path: string }>
    ) => { state.historyPreview = action.payload.path },
    updateOrgChart: (
      state,
      action: PayloadAction<{ orgChart: string }>
    ) => { state.orgChart.updatedServerFilename = action.payload.orgChart },
    previewOrgChart: (
      state,
      action: PayloadAction<{ path: string }>
    ) => { state.orgChartPreview = action.payload.path },
    updateCompanyInfo: (
      state,
      action: PayloadAction<{ ci: string }>
    ) => { state.ci.updatedServerFilename = action.payload.ci },
    previewCompanyInfo: (
      state,
      action: PayloadAction<{ path: string }>
    ) => { state.ciPreview = action.payload.path }
  }
});

export const {
  updateIntroduce,
  updateHistory,
  previewHistory,
  updateOrgChart,
  previewOrgChart,
  updateCompanyInfo,
  previewCompanyInfo } = ModeSlice.actions;
export default ModeSlice.reducer;