import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 등록 (제품 사진, 규격 사진)

/**
 * productContent : 제품 정보
 * productPath : 제품 이미지 경로 리스트
 * gradePath : 규격 이미지 경로 리스트
 * productImage : 전송할 제품 이미지 정보
 * gradeImage :  전송할 규격 이미지 정보
 */

/**
 * updateProductName : 제품 이름 입력
 * updateProductDescription : 제품 설명 입력
 * updateProductImage : 전송할 제품 이미지 추가
 * deleteProductImage : 전송할 제품 이미지 삭제
 * updateGradeImage : 전송할 규격 이미지 추가
 * deleteGradeImage : 전송할 규격 이미지 삭제
 * updateGradeImage : 전송할 규격 이미지 추가
 * deleteGradeImage : 전송할 규격 이미지 삭제
 * addProductImagePath : 제품 사진 추가 (미리보기)
 * deleteProductImagePath : 제품 사진 삭제 (미리보기)
 * addGradeImagePath : 규격 사진 추가 (미리보기)
 * deleteGradeImagePath : 규격 사진 삭제 (미리보기)
 */

interface productContentInitialState {
  productContent: {
    name: string,
    description: string
  },
  productPath: string[],
  gradePath: string[],
  productImage: string[],
  gradeImage: string[]
};

const ProductContentInitialState: productContentInitialState = {
  productContent: { name: '', description: '' },
  productPath: [],
  gradePath: [],
  productImage: [],
  gradeImage: []
};

export const ProductContentSlice = createSlice({
  name: 'productContent',
  initialState: ProductContentInitialState,
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
  deleteGradeImagePath } = ProductContentSlice.actions;
export default ProductContentSlice.reducer;