import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 문의사항 state
interface questionDetailInitialState {
  data: {
    comment: [],
    content: string,
    createTime: string,
    id: number,
    password: string,
    title: string,
    updateTime: string,
    writer: string
  }
};

const QuestionDetailInitialState: questionDetailInitialState = {
  data: {
    comment: [],
    content: '',
    createTime: '',
    id: 0,
    password: '',
    title: '',
    updateTime: '',
    writer: ''
  }
};

// 문의사항 
export const QuestionDetailSlice = createSlice({
  name: 'questionDetail',
  initialState: QuestionDetailInitialState,
  reducers: {
    setDetailData: (
      state,
      action: PayloadAction<{
        data: {
          comment: [],
          content: string,
          createTime: string,
          id: number,
          password: string,
          title: string,
          updateTime: string,
          writer: string
        }
      }>
    ) => { state.data = action.payload.data }
  }
});

export const { setDetailData } = QuestionDetailSlice.actions;
export default QuestionDetailSlice.reducer;