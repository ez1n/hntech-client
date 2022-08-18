import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 자료실

/**
 * totalPage: 전체 페이지
 * currentPage: 현재 페이지
 * archives : 자료실 글 목록
 * notice : 자료실 공지 목록
 * detail : 자료실 상세보기 정보
 * archiveModifyContent : 수정용 상세보기 정보
 * archiveContent : 자료실 글 쓰기 (폼 내용)
 */

/**
 * getAllArchives : 자료실 글 목록 받아오기
 * getNotice : 자료실 공지 받아오기
 * getDetailData : 자료실 글 정보 받아오기 (상세보기)
 * copyDetailData : 글 정보 복제 (수정용 데이터)
 * updateArchiveTitle : 자료실 제목 입력
 * updateArchiveContent : 자료실 내용 입력
 * updateArchiveNoticeChecked : 자료실 공지사항 체크 (default: false)
 * updateArchiveCategory : 자료실 카테고리 선택
 * resetArchiveState : 자료실 state 초기화
 * modifyArchiveTitle : 자료실 제목 수정
 * modifyArchiveContent : 자료실 내용 수정
 * modifyArchiveNoticeChecked : 자료실 공지사항 체크 수정
 * modifyArchiveCategory : 자료실 카테고리 수정
 */

interface archiveInitialState {
  totalPage: number,
  currentPage: number,
  archives: {
    categoryName: string,
    createTime: string,
    id: number,
    new: string,
    title: string,
  }[],
  notice: {
    categoryName: string,
    createTime: string,
    id: number,
    new: string,
    title: string,
  }[],
  detail: {
    categoryName: string,
    content: string,
    createTime: string,
    id: number,
    notice: string
    title: string,
  },
  archiveModifyContent: {
    categoryName: string,
    content: string,
    notice: string
    title: string,
  },
  archiveContent: {
    categoryName: string,
    content: string,
    notice: string,
    title: string,
  }
};

const ArchiveInitialState: archiveInitialState = {
  totalPage: 0,
  currentPage: 0,
  archives: [],
  notice: [],
  detail: { categoryName: '', content: '', createTime: '', id: 0, notice: '', title: '', },
  archiveModifyContent: { categoryName: '', content: '', notice: '', title: '', },
  archiveContent: { categoryName: '', content: '', notice: 'false', title: '' }
};

export const ArchiveSlice = createSlice({
  name: 'archive',
  initialState: ArchiveInitialState,
  reducers: {
    getAllArchives: (
      state,
      action: PayloadAction<{
        archives: {
          categoryName: string,
          createTime: string,
          id: number,
          new: string,
          title: string,
        }[], totalPage: number, currentPage: number
      }>
    ) => {
      state.archives = action.payload.archives;
      state.totalPage = action.payload.totalPage;
      state.currentPage = action.payload.currentPage;
    },
    getNotice: (
      state,
      action: PayloadAction<{
        notice: {
          categoryName: string,
          createTime: string,
          id: number,
          new: string,
          title: string,
        }[]
      }>
    ) => { state.notice = action.payload.notice },
    getDetailData: (
      state,
      action: PayloadAction<{
        detail: {
          categoryName: string,
          content: string,
          createTime: string,
          id: number,
          notice: string
          title: string,
        }
      }>
    ) => { state.detail = action.payload.detail },
    copyDetailData: (
      state,
      action: PayloadAction<{
        detail: {
          categoryName: string,
          content: string,
          createTime: string,
          id: number,
          notice: string
          title: string,
        }
      }>
    ) => {
      state.archiveModifyContent.categoryName = action.payload.detail.categoryName;
      state.archiveModifyContent.content = action.payload.detail.content;
      state.archiveModifyContent.notice = action.payload.detail.notice;
      state.archiveModifyContent.title = action.payload.detail.title;
    },
    updateArchiveTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.archiveContent.title = action.payload.title },
    updateArchiveContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.archiveContent.content = action.payload.content },
    updateArchiveNoticeChecked: (
      state,
      action: PayloadAction<{ isNotice: boolean }>
    ) => { state.archiveContent.notice = String(action.payload.isNotice) },
    updateArchiveCategory: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => { state.archiveContent.categoryName = action.payload.categoryName },
    resetArchiveState: (state) => {
      state.archiveContent = ArchiveInitialState.archiveContent;
    },
    modifyArchiveTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.archiveModifyContent.title = action.payload.title },
    modifyArchiveContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.archiveModifyContent.content = action.payload.content },
    modifyArchiveNoticeChecked: (
      state,
      action: PayloadAction<{ isNotice: boolean }>
    ) => { state.archiveModifyContent.notice = String(action.payload.isNotice) },
    modifyArchiveCategory: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => { state.archiveModifyContent.categoryName = action.payload.categoryName },
  }
});

export const {
  getAllArchives,
  getNotice,
  getDetailData,
  copyDetailData,
  updateArchiveTitle,
  updateArchiveContent,
  updateArchiveNoticeChecked,
  updateArchiveCategory,
  resetArchiveState,
  modifyArchiveTitle,
  modifyArchiveContent,
  modifyArchiveNoticeChecked,
  modifyArchiveCategory } = ArchiveSlice.actions;
export default ArchiveSlice.reducer;