import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 등록 (다운로드 자료)

/**
 * file : 첨부파일 (버튼에 넣을 자료)
 */

/**
 * addFile : 파일 업로드
 * deleteFile : 파일 삭제
 * addUploadButton : 업로드 버튼 추가
 * deleteUploadButton : 업로드 버튼 삭제
 */

interface productFileInitialState {
  file: { key: number, name: string | undefined }[] | []
};

const ProductFileInitialState: productFileInitialState = {
  file: [{ key: 0, name: undefined }]
};

export const ProductFileFileSlice = createSlice({
  name: 'productFile',
  initialState: ProductFileInitialState,
  reducers: {
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
    addUploadButton: (state) => {
      const fileLen = state.file['length'];
      const newFile = [...state.file, { key: state.file[fileLen - 1].key + 1, name: '' }];
      state.file = newFile;
    },
    deleteUploadButton: (
      state,
      action: PayloadAction<{ key: number }>
    ) => {
      const newFile = state.file.filter((item, index) => index !== action.payload.key);
      state.file = newFile;
    },
  }
});

export const { addFile, deleteFile, addUploadButton, deleteUploadButton } = ProductFileFileSlice.actions;
export default ProductFileFileSlice.reducer;