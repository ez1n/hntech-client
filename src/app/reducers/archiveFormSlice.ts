import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 자료실 글 등록

/**
 * archiveFile : 자료실 첨부파일 (이름, 정보)
 * archiveModifyContent : 상세보기 정보 (수정용)
 * archiveContent : 자료실 글 쓰기 (폼 내용)
 */

/**
 * addArchiveFile : 자료실 파일 이름 추가 (미리보기)
 * deleteArchiveFile : 자료실 파일 이름 삭제 (미리보기)
 * resetArchiveFileName : 자료실 파일 이름 초기화 (미리보기)
 * updateArchiveFileData : 전송할 자료실 파일 정보 추가
 * deleteArchiveFileData : 전송할 자료실 파일 정보 삭제
 * resetArchiveFileData : 자료실 파일 정보 초기화
 * copyArchiveDetailData : 자료실 글 정보 복제 (수정용 데이터)
 * updateArchiveTitle : 자료실 글 제목 입력
 * updateArchiveContent : 자료실 글 내용 입력
 * updateArchiveNoticeChecked : 자료실 공지사항 체크 (default: false)
 * updateArchiveCategory : 자료실 카테고리 선택
 * resetArchiveState : 자료실 폼 초기화
 * modifyArchiveTitle : 자료실 제목 수정
 * modifyArchiveContent : 자료실 내용 수정
 * modifyArchiveNoticeChecked : 자료실 공지사항 체크 수정
 * modifyArchiveCategory : 자료실 카테고리 수정
 * deleteArchiveOriginFile : 자료실 기존 파일 정보 삭제 (자료실 글 수정)
 */

interface archiveFormInitialState {
  archiveFile: {
    name: string[],
    data: string[],
  },
  archiveModifyContent: {
    categoryName: string,
    content: string,
    files: {
      id: 0,
      originalFilename: string,
      savedPath: string,
      serverFilename: string
    }[],
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

const ArchiveFormInitialState: archiveFormInitialState = {
  archiveFile: {
    name: [],
    data: []
  },
  archiveModifyContent: {categoryName: '', content: '', files: [], notice: '', title: '',},
  archiveContent: {categoryName: '전체', content: '', notice: 'false', title: ''}
};

export const ArchiveFormSlice = createSlice({
  name: 'archiveForm',
  initialState: ArchiveFormInitialState,
  reducers: {
    addArchiveFile: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newFile = [...state.archiveFile.name, action.payload.item];
      state.archiveFile.name = newFile;
    },
    deleteArchiveFile: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.archiveFile.name.filter((value, index) => index !== action.payload.num);
      state.archiveFile.name = newFile;
    },
    updateArchiveFileData: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.archiveFile.data, action.payload.file];
      state.archiveFile.data = newFile;
    },
    deleteArchiveFileData: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.archiveFile.data.filter((value, index) => index !== action.payload.num);
      state.archiveFile.data = newFile;
    },
    resetArchiveFile: (state) => {
      state.archiveFile = {name: [], data: []}
    },
    copyArchiveDetailData: (
      state,
      action: PayloadAction<{
        detail: {
          categoryName: string,
          content: string,
          createTime: string,
          files: {
            id: 0,
            originalFilename: string,
            savedPath: string,
            serverFilename: string
          }[],
          id: number,
          title: string,
          notice: string
        }
      }>
    ) => {
      state.archiveModifyContent.categoryName = action.payload.detail.categoryName;
      state.archiveModifyContent.content = action.payload.detail.content;
      state.archiveModifyContent.files = action.payload.detail.files;
      state.archiveModifyContent.notice = action.payload.detail.notice;
      state.archiveModifyContent.title = action.payload.detail.title;
    },
    updateArchiveTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => {
      state.archiveContent.title = action.payload.title
    },
    updateArchiveContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => {
      state.archiveContent.content = action.payload.content
    },
    updateArchiveNoticeChecked: (
      state,
      action: PayloadAction<{ isNotice: boolean }>
    ) => {
      state.archiveContent.notice = String(action.payload.isNotice)
    },
    updateArchiveCategory: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => {
      state.archiveContent.categoryName = action.payload.categoryName
    },
    resetArchiveState: (state) => {
      state.archiveContent = {categoryName: '', content: '', notice: 'false', title: ''};
    },
    modifyArchiveTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => {
      state.archiveModifyContent.title = action.payload.title
    },
    modifyArchiveContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => {
      state.archiveModifyContent.content = action.payload.content
    },
    modifyArchiveNoticeChecked: (
      state,
      action: PayloadAction<{ isNotice: boolean }>
    ) => {
      state.archiveModifyContent.notice = String(action.payload.isNotice)
    },
    deleteArchiveOriginFile: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.archiveModifyContent.files.filter((value, index) => index !== action.payload.num);
      state.archiveModifyContent.files = newFile;
    },
  }
});

export const {
  addArchiveFile,
  deleteArchiveFile,
  updateArchiveFileData,
  deleteArchiveFileData,
  resetArchiveFile,
  copyArchiveDetailData,
  updateArchiveTitle,
  updateArchiveContent,
  updateArchiveNoticeChecked,
  updateArchiveCategory,
  resetArchiveState,
  modifyArchiveTitle,
  modifyArchiveContent,
  modifyArchiveNoticeChecked,
  deleteArchiveOriginFile
} = ArchiveFormSlice.actions;
export default ArchiveFormSlice.reducer;