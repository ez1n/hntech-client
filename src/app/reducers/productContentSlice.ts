import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 등록 (제품 사진, 규격 사진)

/**
 * productContent : 제품 정보
 * productPath : 제품 이미지 경로 리스트
 * gradePath : 규격 이미지 경로 리스트
 */

/**
 * updateProductName : 제품 이름 입력
 * updateProductDescription : 제품 설명 입력
 * addProductImagePath : 제품 사진 추가
 * deleteProductImagePath : 제품 사진 삭제
 * addGradeImagePath : 규격 사진 추가
 * deleteGradeImagePath : 규격 사진 삭제
 */

interface productContentInitialState {
  productContent: { name: string, productImage: FormData | null, description: string, gradeImage: FormData | null },
  productPath: string[],
  gradePath: string[]
};

const ProductContentInitialState: productContentInitialState = {
  productContent: { name: '', productImage: null, description: '', gradeImage: null },
  productPath: [],
  gradePath: []
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
  addProductImagePath,
  deleteProductImagePath,
  addGradeImagePath,
  deleteGradeImagePath } = ProductContentSlice.actions;
export default ProductContentSlice.reducer;