import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 파일 전송

/**
 * 
 */

/**
 * 
 */

interface fileInitialState {
  singleFile: {
    id: number,
    originalFilename: string,
    serverFilename: string,
    type: string
  },
  multiFiles: {
    id: number,
    originalFilename: string,
    serverFilename: string,
    type: string
  }[],
};

const FileInitialState: fileInitialState = {
  singleFile: {
    id: 0,
    originalFilename: '',
    serverFilename: '',
    type: ''
  },
  multiFiles: []
};

export const FileSlice = createSlice({
  name: 'file',
  initialState: FileInitialState,
  reducers: {
    setSingleFile: (
      state,
      action: PayloadAction<{
        file: {
          id: number,
          originalFilename: string,
          serverFilename: string,
          type: string
        }
      }>
    ) => { state.singleFile = action.payload.file },
    setMultiFiles: (
      state,
      action: PayloadAction<{
        files: {
          id: number,
          originalFilename: string,
          serverFilename: string,
          type: string
        }[]
      }>
    ) => { state.multiFiles = action.payload.files }
  }
});

export const { setSingleFile, setMultiFiles } = FileSlice.actions;
export default FileSlice.reducer;