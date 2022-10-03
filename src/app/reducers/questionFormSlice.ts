import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
  questionFile: { file: string, path: string }[]
  currentQuestion: {
    title: string,
    content: string,
    files: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string
    }[]
  }
};

const InitialState: initialState = {
  questionContent: {title: '', writer: '', password: '', content: ''},
  questionFile: [],
  currentQuestion: {title: '', content: '', files: []}
};

export const QuestionFormSlice = createSlice({
  name: 'questionForm',
  initialState: InitialState,
  reducers: {
    resetQuestionContent: state => {
      state.questionContent = {title: '', writer: '', password: '', content: ''};
      state.questionFile = []
    },
    updateQuestionTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => {
      state.questionContent.title = action.payload.title
    },
    updateQuestionName: (
      state,
      action: PayloadAction<{ writer: string }>
    ) => {
      state.questionContent.writer = action.payload.writer
    },
    updateQuestionPassword: (
      state,
      action: PayloadAction<{ password: string }>
    ) => {
      state.questionContent.password = action.payload.password
    },
    updateQuestionContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => {
      state.questionContent.content = action.payload.content
    },
    addQuestionFile: (
      state,
      action: PayloadAction<{ file: { file: string, path: string } }>
    ) => {
      state.questionFile = [...state.questionFile, action.payload.file];
    },
    deleteQuestionFile: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      state.questionFile = state.questionFile.filter((value, index) => index !== action.payload.index);
    },
    setCurrentQuestion: (
      state,
      action: PayloadAction<{
        question: {
          content: string,
          title: string,
          files: {
            id: number,
            originalFilename: string,
            savedPath: string,
            serverFilename: string
          }[]
        }
      }>
    ) => {
      state.currentQuestion = action.payload.question;
    },
    modifyQuestionTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => {
      state.currentQuestion.title = action.payload.title
    },
    modifyQuestionContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => {
      state.currentQuestion.content = action.payload.content
    },
    deleteOriginalQuestionFile: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      state.currentQuestion.files = state.currentQuestion.files.filter((value, index) => index !== action.payload.index);
    }
  }
});

export const {
  resetQuestionContent,
  updateQuestionTitle,
  updateQuestionName,
  updateQuestionPassword,
  updateQuestionContent,
  addQuestionFile,
  deleteQuestionFile,
  setCurrentQuestion,
  modifyQuestionTitle,
  modifyQuestionContent,
  deleteOriginalQuestionFile
} = QuestionFormSlice.actions;
export default QuestionFormSlice.reducer;
