import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// form data state
interface initialState {
  noticeContent: { title: string, content: string, notice: boolean }, // 문의게시판 공지사항
  createQuestionForm: { title: string, writer: string, password: string, content: string }, // 문의게시판
  archiveContent: { title: string, content: string, category: string, notice: boolean } // 자료실
};

const InitialState: initialState = {
  noticeContent: { title: '', content: '', notice: true },
  createQuestionForm: { title: '', writer: '', password: '', content: '' },
  archiveContent: { title: '', content: '', category: '전체', notice: false }
};

// update
export const FormContentSlice = createSlice({
  name: 'formContent',
  initialState: InitialState,
  reducers: {
    // 문의게시판 공지사항
    updateNoticeTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.noticeContent.title = action.payload.title },
    updateNoticeContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.noticeContent.content = action.payload.content },

    // 문의사항
    updateQuestionTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.createQuestionForm.title = action.payload.title },
    updateQuestionName: (
      state,
      action: PayloadAction<{ writer: string }>
    ) => { state.createQuestionForm.writer = action.payload.writer },
    updateQuestionPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.createQuestionForm.password = action.payload.password },
    updateQuestionContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.createQuestionForm.content = action.payload.content },

    // 자료실
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
    ) => { state.archiveContent.notice = action.payload.isNotice },
    updateArchiveCategory: (
      state,
      action: PayloadAction<{ category: string }>
    ) => { state.archiveContent.category = action.payload.category },
    resetArchiveState: (state) => {
      state.archiveContent = { title: '', content: '', category: '전체', notice: false }
    }, // state 초기화
  }
});

export const {
  updateNoticeTitle,
  updateNoticeContent,
  updateArchiveTitle,
  updateArchiveContent,
  updateArchiveNoticeChecked,
  updateArchiveCategory,
  resetArchiveState,
  updateQuestionTitle,
  updateQuestionName,
  updateQuestionPassword,
  updateQuestionContent } = FormContentSlice.actions;
export default FormContentSlice.reducer;
