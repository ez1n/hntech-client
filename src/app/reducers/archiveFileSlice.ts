import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 자료실 (첨부파일)

/**
 * file : 첨부파일
 */

/**
 * addArchiveFile : 파일 추가
 * deleteArchiveFile : 파일 삭제
 * updateArchiveFileData : 전송할 파일 추가
 * deleteArchiveFileData : 전송할 파일 삭제
 */

interface archiveFileInitialState {
  file: {
    name: string[],
    data: string[],
  },
};

const ArchiveFileInitialState: archiveFileInitialState = {
  file: {
    name: [],
    data: []
  },
};

export const ArchiveFileSlice = createSlice({
  name: 'archiveFile',
  initialState: ArchiveFileInitialState,
  reducers: {
    addArchiveFile: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newFile = [...state.file.name, action.payload.item];
      state.file.name = newFile
    },
    deleteArchiveFile: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.file.name.filter((value, index) => index !== action.payload.num);
      state.file.name = newFile;
    },
    updateArchiveFileData: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.file.data, action.payload.file];
      state.file.data = newFile;
    },
    deleteArchiveFileData: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.file.data.filter((value, index) => index !== action.payload.num);
      state.file.data = newFile;
    },
  }
});

export const {
  addArchiveFile,
  deleteArchiveFile,
  updateArchiveFileData,
  deleteArchiveFileData } = ArchiveFileSlice.actions;
export default ArchiveFileSlice.reducer;