import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 카테고리 (카테고리 목록 받아오기, 카테고리 선택 여부)

/**
 * categoryList : 제품 카테고리 목록
 * selected : 제품 카테고리 선택 여부
 */

/**
 * getProductCategory : 카테고리 목록 받아오기
 * selectCategoryTrue : 카테고리 선택 true
 * selectCategoryFalse : 카테고리 선택 false
 */

interface productCategoryInitialState {
  categoryList: string[],
  selected: boolean
};

const ProductCategoryInitialState: productCategoryInitialState = {
  categoryList: [],
  selected: false
};

export const ProductCategorySlice = createSlice({
  name: 'productCategory',
  initialState: ProductCategoryInitialState,
  reducers: {
    getProductCategory: (
      state,
      action: PayloadAction<{ categories: string[] }>
    ) => { state.categoryList = action.payload.categories },
    selectCategoryTrue: (state) => { state.selected = true },
    selectCategoryFalse: (state) => { state.selected = false },
  }
});

export const {
  getProductCategory,
  selectCategoryTrue,
  selectCategoryFalse } = ProductCategorySlice.actions;
export default ProductCategorySlice.reducer;