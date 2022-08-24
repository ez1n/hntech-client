import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 문의게시판 글 등록

/**
 * createQuestionForm : 문의사항
 * currentQuestion: 문의사항 글 정보 (수정용)
 */

/**
 * updateQuestionTitle : 문의사항 제목 입력
 * updateQuestionName : 문의사항 이름 입력
 * updateQuestionPassword : 문의사항 비밀번호 입력
 * updateQuestionContent : 문의사항 내용 입력
 * setCurrentQuestion : 현재 정보 받아오기 (수정용)
 * updateQuestionTitle : 문의사항 제목 수정
 * updateQuestionContent : 문의사항 내용 수정
 */

interface initialState {
  questionContent: { title: string, writer: string, password: string, content: string },
  currentQuestion: { title: string, content: string }
};

const InitialState: initialState = {
  questionContent: { title: '', writer: '', password: '', content: '' },
  currentQuestion: { title: '', content: '' }
};

export const QuestionFormSlice = createSlice({
  name: 'questionForm',
  initialState: InitialState,
  reducers: {
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
    ) => { state.questionContent.content = action.payload.content },
    setCurrentQuestion: (
      state,
      action: PayloadAction<{ content: string, title: string }>
    ) => {
      state.currentQuestion.content = action.payload.content;
      state.currentQuestion.title = action.payload.title;
    },
    modifyQuestionTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.currentQuestion.title = action.payload.title },
    modifyQuestionContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.currentQuestion.content = action.payload.content }
  }
});

export const {
  updateQuestionTitle,
  updateQuestionName,
  updateQuestionPassword,
  updateQuestionContent,
  setCurrentQuestion,
  modifyQuestionTitle,
  modifyQuestionContent } = QuestionFormSlice.actions;
export default QuestionFormSlice.reducer;
