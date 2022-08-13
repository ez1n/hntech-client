import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * file : 공지사항 첨부파일
 */

/**
 * addNoticeFile : 파일 첨부
 * deleteNoticeFile : 파일 삭제
 */

// 공지사항 파일 state
interface noticeInitialState {
  file: string[]
};

const NoticeInitialState: noticeInitialState = {
  file: []
};

// 공지사항 파일 업로드
export const NoticeSlice = createSlice({
  name: 'notice',
  initialState: NoticeInitialState,
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

export const { addNoticeFile, deleteNoticeFile } = NoticeSlice.actions;
export default NoticeSlice.reducer;