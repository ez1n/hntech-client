import { createSlice } from "@reduxjs/toolkit";

// 문의 취소 state
interface questionInitialState {
  cancel: boolean
};

const QuestionInitialState: questionInitialState = {
  cancel: false
};

// 문의하기 취소 dialog 업데이트
export const QuestionSlice = createSlice({
  name: 'cancel',
  initialState: QuestionInitialState,
  reducers: {
    clickGoBack: (state) => { state.cancel = !state.cancel }
  }
});

export const { clickGoBack } = QuestionSlice.actions;
export default QuestionSlice.reducer;