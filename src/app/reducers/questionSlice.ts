import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 문의사항 state
interface questionInitialState {
  pw: { password: string },
  passwordState: boolean,
  questions: {
    id: number,
    title: string,
    status: string | null,
    writer: string,
    createTime: string,
    new: string
  }[],
  totalPage: number,
  currentPage: number,
  faq: {
    id: number,
    title: string,
    status: string | null,
    writer: string,
    createTime: string,
    new: string
  }[]
};

const QuestionInitialState: questionInitialState = {
  pw: { password: '' },
  passwordState: false,
  questions: [
    { id: 0, title: '', status: '', writer: '', createTime: '', new: '' },
  ],
  totalPage: 0,
  currentPage: 0,
  faq: [
    { id: 0, title: '', status: '', writer: '', createTime: '', new: '' },
  ]
};

// 문의사항 
export const QuestionSlice = createSlice({
  name: 'question',
  initialState: QuestionInitialState,
  reducers: {
    postPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => { state.pw.password = action.payload.password },
    inputPassword: (state) => { state.passwordState = !(state.passwordState) },
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
    }
  }
});

export const { postPassword, inputPassword, getAllQuestions, getFaq } = QuestionSlice.actions;
export default QuestionSlice.reducer;