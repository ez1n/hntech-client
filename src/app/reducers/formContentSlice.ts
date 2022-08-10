import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// form data state
interface initialState {
  noticeContent: { title: string, content: string }, // 공지사항
  archiveContent: { title: string, content: string } // 자료실
};

const InitialState: initialState = {
  noticeContent: { title: '', content: '' },
  archiveContent: { title: '', content: '' }
};

// update
export const FormContentSlice = createSlice({
  name: 'formContent',
  initialState: InitialState,
  reducers: {
    // 공지사항
    updateNoticeTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.noticeContent.title = action.payload.title },
    updateNoticeContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.noticeContent.content = action.payload.content },

    // 자료실
    updateArchiveTitle: (
      state,
      action: PayloadAction<{ title: string }>
    ) => { state.archiveContent.title = action.payload.title },
    updateArchiveContent: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.archiveContent.content = action.payload.content },
  }
});

export const { updateNoticeTitle, updateNoticeContent, updateArchiveTitle, updateArchiveContent } = FormContentSlice.actions;
export default FormContentSlice.reducer;
