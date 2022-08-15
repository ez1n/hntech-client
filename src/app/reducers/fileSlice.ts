import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 파일 전송

/**
 * multiFiles : 다중 파일 state
 */

/**
 * setMultiFiles : 다중 파일 업데이트
 */

interface fileInitialState {
  multiFiles: {
    id: number,
    originalFilename: string,
    serverFilename: string,
    type: string
  }[],
};

const FileInitialState: fileInitialState = {
  multiFiles: []
};

export const FileSlice = createSlice({
  name: 'file',
  initialState: FileInitialState,
  reducers: {
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

export const { setMultiFiles } = FileSlice.actions;
export default FileSlice.reducer;