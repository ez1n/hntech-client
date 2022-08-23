import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 등록

/**
 * productContent : 제품 정보
 * productPath : 제품 이미지 경로 리스트
 * gradePath : 규격 이미지 경로 리스트
 * productImage : 전송할 제품 이미지 정보
 * gradeImage :  전송할 규격 이미지 정보
 * productFileName : 제품 첨부파일 이름 미리보기 (버튼에 넣을 자료)
 * productFile : 전송할 제품 첨부파일 데이터
 */

/**
 * updateProductName : 제품 이름 입력
 * updateProductDescription : 제품 설명 입력
 * updateProductImage : 전송할 제품 이미지 추가
 * deleteProductImage : 전송할 제품 이미지 삭제
 * updateGradeImage : 전송할 규격 이미지 추가
 * deleteGradeImage : 전송할 규격 이미지 삭제
 * addProductImagePath : 제품 사진 추가 (미리보기)
 * deleteProductImagePath : 제품 사진 삭제 (미리보기)
 * addGradeImagePath : 규격 사진 추가 (미리보기)
 * deleteGradeImagePath : 규격 사진 삭제 (미리보기)
 * addProductFile : 제품 파일 업로드
 * deleteProductFileName : 제품 파일 삭제
 * addProductUploadButton : 제품 업로드 버튼 추가
 * deleteProductUploadButton : 제품 업로드 버튼 삭제
 * updateProductFile: 전송할 제품 파일 추가
 * deleteProductFile: 전송할 제품 파일 삭제
 */

interface productFormInitialState {
  productContent: {
    name: string,
    description: string
  },
  productPath: string[],
  gradePath: string[],
  productImage: string[],
  gradeImage: string[],
  productFileName: { key: number, name: string | undefined }[] | [],
  productFile: string[]
};

const ProductFormInitialState: productFormInitialState = {
  productContent: { name: '', description: '' },
  productPath: [],
  gradePath: [],
  productImage: [],
  gradeImage: [],
  productFileName: [{ key: 0, name: undefined }],
  productFile: []
};

export const ProductFormSlice = createSlice({
  name: 'productForm',
  initialState: ProductFormInitialState,
  reducers: {
    updateProductName: (
      state,
      action: PayloadAction<{ name: string }>
    ) => { state.productContent.name = action.payload.name },
    updateProductDescription: (
      state,
      action: PayloadAction<{ description: string }>
    ) => { state.productContent.description = action.payload.description },
    updateProductImage: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.productImage, action.payload.file];
      state.productImage = newFile;
    },
    deleteProductImage: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.productImage.filter((value, index) => index !== action.payload.num);
      state.productImage = newFile;
    },
    updateGradeImage: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.gradeImage, action.payload.file];
      state.gradeImage = newFile;
    },
    deleteGradeImage: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.gradeImage.filter((value, index) => index !== action.payload.num);
      state.gradeImage = newFile;
    },
    addProductImagePath: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newPath = [...state.productPath, action.payload.item];
      state.productPath = newPath;
    },
    deleteProductImagePath: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newPath = state.productPath.filter((path, index) => index !== action.payload.num);
      state.productPath = newPath;
    },
    addGradeImagePath: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newPath = [...state.gradePath, action.payload.item];
      state.gradePath = newPath;
    },
    deleteGradeImagePath: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newPath = state.gradePath.filter((path, index) => index !== action.payload.num)
      state.gradePath = newPath;
    },
    addProductFile: (
      state,
      action: PayloadAction<{ key: number, item: string }>
    ) => {
      const newFile = state.productFileName.map(value => {
        if (value.key === action.payload.key) {
          return { ...value, name: action.payload.item }
        }
        return value;
      })
      state.productFileName = newFile;
    },
    deleteProductFileName: (
      state,
      action: PayloadAction<{ key: number }>
    ) => {
      const newFile = state.productFileName.map(value => {
        if (value.key === action.payload.key) {
          return { ...value, name: '' }
        }
        return value;
      })
      state.productFileName = newFile;
    },
    addProductUploadButton: (state) => {
      const fileLen = state.productFileName['length'];
      const newFile = [...state.productFileName, { key: state.productFileName[fileLen - 1].key + 1, name: '' }];
      state.productFileName = newFile;
    },
    deleteProductUploadButton: (
      state,
      action: PayloadAction<{ key: number }>
    ) => {
      const newFile = state.productFileName.filter((item, index) => index !== action.payload.key);
      state.productFileName = newFile;
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
  updateProductName,
  updateProductDescription,
  updateProductImage,
  deleteProductImage,
  updateGradeImage,
  deleteGradeImage,
  addProductImagePath,
  deleteProductImagePath,
  addGradeImagePath,
  deleteGradeImagePath,
  addProductFile,
  deleteProductFileName,
  addProductUploadButton,
  deleteProductUploadButton,
  updateProductFile,
  deleteProductFile } = ProductFormSlice.actions;
export default ProductFormSlice.reducer;