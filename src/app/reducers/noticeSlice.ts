import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 문의게시판 공지사항

/**
 * file : 공지사항 첨부파일
 * files : 전송할 파일 데이터
 */

/**
 * addNoticeFile : 파일 첨부
 * deleteNoticeFile : 파일 삭제
 * updateFiles : 전송할 파일 데이터 추가
 */

// 공지사항 파일 state
interface noticeInitialState {
  file: string[],
  files: string[],
};

const NoticeInitialState: noticeInitialState = {
  file: [],
  files: []
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
    },
    updateFiles: (
      state,
      action: PayloadAction<{ file: string }>
    ) => { state.files.push(action.payload.file) }
  }
});

export const { addNoticeFile, deleteNoticeFile, updateFiles } = NoticeSlice.actions;
export default NoticeSlice.reducer;