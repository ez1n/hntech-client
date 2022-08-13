import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 문의사항 (question, questionDetail)

/**
 * pw : 비밀번호
 * passwordState : 비밀번호 입력 여부
 * totalPage : 전체 페이지
 * currentPage : 현재 페이지
 * questions : 문의 목록
 * faq : FAQ 목록
 * detail : 문의사항 상세보기 정보
 */

/**
 * postPassword : 비밀번호 전송 (자세히 보기 요청)
 * inputPassword : 비밀번호 입력
 * getAllQuestions : 전체 문의 목록 받아오기
 * getFaq : 전체 FAQ 목록 받아오기
 * setDetailData : 문의사항 상세보기 정보 받아오기
 * updateQuestionTitle : 문의사항 제목 수정
 * updateQuestionContent : 문의사항 내용 수정
 */

interface questionInitialState {
  pw: { password: string },
  passwordState: boolean,
  totalPage: number,
  currentPage: number,
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
    password: string,
    title: string,
    updateTime: string,
    writer: string
  }
};

const QuestionInitialState: questionInitialState = {
  pw: { password: '' },
  passwordState: false,
  totalPage: 0,
  currentPage: 0,
  questions: [],
  faq: [],
  detail: {
    comments: [{ content: '안녕하세요', id: 0, sequence: 0, writer: '작성자' }, { content: '안녕하세요', id: 0, sequence: 0, writer: '관리자' }],
    content: '',
    createTime: '',
    id: 0,
    password: '',
    title: '',
    updateTime: '',
    writer: ''
  }
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
    setDetailData: (
      state,
      action: PayloadAction<{
        detail: {
          comments: [],
          content: string,
          createTime: string,
          id: number,
          password: string,
          title: string,
          updateTime: string,
          writer: string
        }
      }>
    ) => { state.detail = action.payload.detail },
    modifyQuestionTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.detail.title = action.payload.title },
    modifyQuestionContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.detail.content = action.payload.content },
  }
});

export const {
  inputPassword,
  setPassword,
  getAllQuestions,
  getFaq,
  setDetailData,
  modifyQuestionTitle,
  modifyQuestionContent } = QuestionSlice.actions;
export default QuestionSlice.reducer;