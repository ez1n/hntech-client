import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 카테고리 (카테고리 목록 받아오기, 카테고리 선택 여부)

/**
 * mainCategories : 메인 카테고리 목록
 * categories : 제품 카테고리 목록
 * currentCategory : 선택한 카테고리 (삭제, 수정)
 * selected : 제품 카테고리 선택 여부
 */

/**
 * setMainCategories : 메인 카테고리 목록 받아오기
 * setAllCategories : 카테고리 목록 받아오기
 * setCurrentCategory: 선택된 카테고리 정보
 * selectCategoryTrue : 카테고리 선택 true
 * selectCategoryFalse : 카테고리 선택 false
 */

interface productCategoryInitialState {
  mainCategories: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    sequence: number
  }[],
  categories: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    sequence: number
  }[],
  currentCategory: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    sequence: number
  },
  selected: boolean
};

const ProductCategoryInitialState: productCategoryInitialState = {
  mainCategories: [],
  categories: [],
  currentCategory: {
    categoryName: '',
    id: 0,
    imageServerFilename: '',
    sequence: 0
  },
  selected: false
};

export const ProductCategorySlice = createSlice({
  name: 'productCategory',
  initialState: ProductCategoryInitialState,
  reducers: {
    setMainCategories: (
      state,
      action: PayloadAction<{
        categories: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          sequence: number
        }[]
      }>
    ) => { state.mainCategories = action.payload.categories },
    setAllCategories: (
      state,
      action: PayloadAction<{
        categories: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          sequence: number
        }[]
      }>
    ) => { state.categories = action.payload.categories },
    setCurrentCategory: (
      state,
      action: PayloadAction<{
        category: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          sequence: number
        }
      }>
    ) => { state.currentCategory = action.payload.category },
    updateCurrentCategoryName: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => { state.currentCategory.categoryName = action.payload.categoryName },
    updateCurrentCategoryImage: (
      state,
      action: PayloadAction<{ image: string }>
    ) => { state.currentCategory.imageServerFilename = action.payload.image },
    selectCategoryTrue: (state) => { state.selected = true },
    selectCategoryFalse: (state) => { state.selected = false },
  }
});

export const {
  setMainCategories,
  setAllCategories,
  setCurrentCategory,
  updateCurrentCategoryName,
  updateCurrentCategoryImage,
  selectCategoryTrue,
  selectCategoryFalse } = ProductCategorySlice.actions;
export default ProductCategorySlice.reducer;