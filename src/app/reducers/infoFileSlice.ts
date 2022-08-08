import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 등록 자료(버튼으로 넣을 파일) state
interface fileInitialState {
  file: { key: number, name: string | undefined }[] | []
};

const FileInitialState: fileInitialState = {
  file: [{ key: 0, name: undefined }]
};

// 자료 업데이트
export const InfoFileSlice = createSlice({
  name: 'productFile',
  initialState: FileInitialState,
  reducers: {
    // 파일 업로드
    addFile: (
      state,
      action: PayloadAction<{ key: number, item: string }>
    ) => {
      const newFile = state.file.map(value => {
        if (value.key === action.payload.key) {
          return { ...value, name: action.payload.item }
        }
        return value;
      })
      state.file = newFile;
    },
    // 파일 삭제
    deleteFile: (
      state,
      action: PayloadAction<{ key: number }>
    ) => {
      const newFile = state.file.map(value => {
        if (value.key === action.payload.key) {
          return { ...value, name: '' }
        }
        return value;
      })
      state.file = newFile;
    },
    // 업로드 버튼 추가
    addUploadButton: (state) => {
      const fileLen = state.file['length'];
      const newFile = [...state.file, { key: state.file[fileLen - 1].key + 1, name: '' }];
      state.file = newFile;
    },
    // 업로드 버튼 삭제
    deleteUploadButton: (
      state,
      action: PayloadAction<{ key: number }>
    ) => {
      const newFile = state.file.filter((item, index) => index !== action.payload.key);
      state.file = newFile;
    },
  }
});

export const { addFile, deleteFile, addUploadButton, deleteUploadButton } = InfoFileSlice.actions;
export default InfoFileSlice.reducer;