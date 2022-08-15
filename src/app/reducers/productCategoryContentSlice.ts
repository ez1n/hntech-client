import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 카테고리 등록

/**
 * categoryImagePath : 카테고리 이미지 미리보기
 * categoryName : 카테고리 이름
 * categoryImage : 카테고리 이미지 정보
 * showInMain : 메인 카테고리
 */

/**
 * addCategoryImage : 이미지 경로 추가
 * deleteCategoryImage : 이미지 삭제
 * updateProductCategoryName : 카테고리 이름 입력
 * updateProductCategoryImage : 카테고리 이미지 입력
 * updateShowInMain : 메인 카테고리 선택
 */

interface productCategoryContentInitialState {
  categoryImagePath: string | null,
  categoryName: string,
  categoryImage: string,
};

const ProductCategoryContentInitialState: productCategoryContentInitialState = {
  categoryImagePath: null,
  categoryName: '',
  categoryImage: '',
};

export const ProductCategoryContentSlice = createSlice({
  name: 'productCategoryContent',
  initialState: ProductCategoryContentInitialState,
  reducers: {
    addCategoryImage: (
      state,
      action: PayloadAction<{ image: string }>
    ) => { state.categoryImagePath = action.payload.image },
    deleteCategoryImage: (state) => { state.categoryImagePath = null },
    updateProductCategoryName: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => { state.categoryName = action.payload.categoryName },
    updateProductCategoryImage: (
      state,
      action: PayloadAction<{ categoryImage: string }>
    ) => { state.categoryImage = action.payload.categoryImage },
  }
});

export const {
  updateProductCategoryName,
  addCategoryImage,
  deleteCategoryImage,
  updateProductCategoryImage } = ProductCategoryContentSlice.actions;
export default ProductCategoryContentSlice.reducer;