import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 자료실 (첨부파일)

/**
 * file : 첨부파일
 */

/**
 * addArchiveFile : 파일 추가
 * deleteArchiveFile : 파일 삭제
 */

interface archiveFileInitialState {
  file: string[]
};

const ArchiveFileInitialState: archiveFileInitialState = {
  file: []
};

export const ArchiveFileSlice = createSlice({
  name: 'archiveFile',
  initialState: ArchiveFileInitialState,
  reducers: {
    addArchiveFile: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newFile = [...state.file, action.payload.item];
      state.file = newFile
    },
    deleteArchiveFile: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.file.filter((value, index) => index !== action.payload.num);
      state.file = newFile;
    }
  }
});

export const { addArchiveFile, deleteArchiveFile } = ArchiveFileSlice.actions;
export default ArchiveFileSlice.reducer;