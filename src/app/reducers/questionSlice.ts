import { createSlice } from "@reduxjs/toolkit";

// 문의사항 비밀번호 입력 state
interface questionInitialState {
  onLogin: boolean
};

const QuestionInitialState: questionInitialState = {
  onLogin: false
};

// 문의사항 게시글 열기
export const QuestionSlice = createSlice({
  name: 'question',
  initialState: QuestionInitialState,
  reducers: {
    openDetail: (state) => { state.onLogin = !state.onLogin }
  }
});

export const { openDetail } = QuestionSlice.actions;
export default QuestionSlice.reducer;