import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 문의사항 정보

/**
 * pw : 비밀번호
 * passwordState : 비밀번호 입력 여부
 * totalPage : 전체 페이지
 * currentPage : 현재 페이지
 * questions : 문의 목록
 * faq : FAQ 목록
 * detail : 문의사항 상세보기 정보
 * currentId: 현재 문의사항 id
 */

/**
 * inputPassword : 비밀번호 입력여부 (boolean)
 * setPassword : 비밀번호 입력
 * setCurrentId : 선택한 문의사항 id 업데이트
 * getAllQuestions : 전체 문의 목록 받아오기
 * getFaq : 전체 FAQ 목록 받아오기
 * setDetailData : 문의사항 상세보기 정보 받아오기
 * updateCommentData : 댓글 업데이트
 */

interface questionInitialState {
  pw: { password: string },
  passwordState: boolean,
  totalPage: number,
  currentPage: number,
  currentId: number,
  questions: {
    id: number,
    title: string,
    status: string,
    writer: string,
    createTime: string,
    new: string
  }[],
  faq: {
    id: number,
    title: string,
    status: string,
    writer: string,
    createTime: string,
    new: string
  }[],
  detail: {
    comments: {
      content: string,
      id: number,
      sequence: number,
      writer: string
    }[],
    content: string,
    createTime: string,
    id: number,
    title: string,
    status: string,
    writer: string
  },
  faqState: string
};

const QuestionInitialState: questionInitialState = {
  pw: { password: '' },
  passwordState: false,
  totalPage: 0,
  currentPage: 0,
  currentId: 0,
  questions: [],
  faq: [],
  detail: {
    comments: [],
    content: '',
    createTime: '',
    id: 0,
    title: '',
    status: '',
    writer: ''
  },
  faqState: 'false'
};

export const QuestionSlice = createSlice({
  name: 'question',
  initialState: QuestionInitialState,
  reducers: {
    inputPassword: (state) => { state.passwordState = !(state.passwordState) },
    setPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.pw.password = action.payload.password },
    setCurrentId: (
      state,
      action: PayloadAction<{ id: number }>
    ) => { state.currentId = action.payload.id },
    getAllQuestions: (
      state,
      action: PayloadAction<{ questions: [], totalPage: number, currentPage: number }>
    ) => {
      state.questions = action.payload.questions;
      state.totalPage = action.payload.totalPage;
      state.currentPage = action.payload.currentPage;
    },
    getFaq: (
      state,
      action: PayloadAction<{ faq: [] }>
    ) => {
      state.faq = action.payload.faq;
    },
    setFaqState: (
      state,
      action: PayloadAction<{ faq: boolean }>
    ) => {
      state.faqState = String(action.payload.faq);
    },
    setDetailData: (
      state,
      action: PayloadAction<{
        detail: {
          comments: [],
          content: string,
          createTime: string,
          id: number,
          title: string,
          status: string,
          writer: string
        }
      }>
    ) => { state.detail = action.payload.detail },
    updateCommentData: (
      state,
      action: PayloadAction<{ comments: [] }>
    ) => {
      state.detail.comments = action.payload.comments
    }
  }
});

export const {
  inputPassword,
  setPassword,
  setCurrentId,
  getAllQuestions,
  getFaq,
  setFaqState,
  updateCommentData,
  setDetailData } = QuestionSlice.actions;
export default QuestionSlice.reducer;