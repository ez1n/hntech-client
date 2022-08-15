import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 문의게시판 공지사항, 문의사항

/**
 * noticeContent : 문의게시판 공지사항 (faq)
 * createQuestionForm : 문의사항
 */

/**
 * updateNoticeTitle : 문의게시판 공지사항 제목 입력
 * updateNoticeContent : 문의게시판 공지사항 내용 입력
 * resetNoticeContent : 문의게시판 공지사항 state 초기화
 * updateQuestionTitle : 문의사항 제목 입력
 * updateQuestionName : 문의사항 이름 입력
 * updateQuestionPassword : 문의사항 비밀번호 입력
 * updateQuestionContent : 문의사항 내용 입력
 */

interface initialState {
  noticeContent: { title: string, content: string, writer: string, notice: boolean },
  questionContent: { title: string, writer: string, password: string, content: string }
};

const InitialState: initialState = {
  noticeContent: { title: '', content: '', writer: '관리자', notice: true },
  questionContent: { title: '', writer: '', password: '', content: '' },
};

export const QuestionContentSlice = createSlice({
  name: 'questionContent',
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
    resetNoticeContent: (state) => { state.noticeContent = { title: '', content: '', writer: '관리자', notice: true } },

    // 문의사항
    updateQuestionTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.questionContent.title = action.payload.title },
    updateQuestionName: (
      state,
      action: PayloadAction<{ writer: string }>
    ) => { state.questionContent.writer = action.payload.writer },
    updateQuestionPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.questionContent.password = action.payload.password },
    updateQuestionContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.questionContent.content = action.payload.content }
  }
});

export const {
  updateNoticeTitle,
  updateNoticeContent,
  resetNoticeContent,
  updateQuestionTitle,
  updateQuestionName,
  updateQuestionPassword,
  updateQuestionContent } = QuestionContentSlice.actions;
export default QuestionContentSlice.reducer;
