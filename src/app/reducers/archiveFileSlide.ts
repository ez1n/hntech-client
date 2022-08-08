import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 자료실 파일 state
interface fileInitialState {
  file: string[]
};

const FileInitialState: fileInitialState = {
  file: []
};

// 자료실 파일 업로드
export const ArchiveFileSlice = createSlice({
  name: 'archiveFile',
  initialState: FileInitialState,
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