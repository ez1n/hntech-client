import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 공지사항 파일 state
interface fileInitialState {
  file: string[]
};

const FileInitialState: fileInitialState = {
  file: []
};

// 공지사항 파일 업로드
export const NoticeFileSlice = createSlice({
  name: 'noticeFile',
  initialState: FileInitialState,
  reducers: {
    addNoticeFile: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newFile = [...state.file, action.payload.item];
      state.file = newFile
    },
    deleteNoticeFile: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.file.filter((value, index) => index !== action.payload.num);
      state.file = newFile;
    }
  }
});

export const { addNoticeFile, deleteNoticeFile } = NoticeFileSlice.actions;
export default NoticeFileSlice.reducer;