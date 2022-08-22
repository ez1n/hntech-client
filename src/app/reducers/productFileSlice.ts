import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 등록 (다운로드 자료)

/**
 * file : 첨부파일 이름 미리보기 (버튼에 넣을 자료)
 * productFile : 전송할 첨부파일 데이터
 */

/**
 * addFile : 파일 업로드
 * deleteFileName : 파일 삭제
 * addUploadButton : 업로드 버튼 추가
 * deleteUploadButton : 업로드 버튼 삭제
 * updateProductFile: 전송할 파일 추가
 * deleteProductFile: 전송할 파일 삭제
 */

interface productFileInitialState {
  file: { key: number, name: string | undefined }[] | [],
  productFile: string[]
};

const ProductFileInitialState: productFileInitialState = {
  file: [{ key: 0, name: undefined }],
  productFile: []
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
    deleteFileName: (
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
    updateProductFile: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.productFile, action.payload.file];
      state.productFile = newFile;
    },
    deleteProductFile: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.productFile.filter((file, index) => index !== action.payload.num);
      state.productFile = newFile;
    }
  }
});

export const {
  addFile,
  deleteFileName,
  addUploadButton,
  deleteUploadButton,
  updateProductFile,
  deleteProductFile } = ProductFileFileSlice.actions;
export default ProductFileFileSlice.reducer;