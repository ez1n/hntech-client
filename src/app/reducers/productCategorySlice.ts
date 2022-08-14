import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 카테고리 (카테고리 목록 받아오기, 카테고리 선택 여부)

/**
 * categories : 제품 카테고리 목록
 * currentCategory : 선택한 카테고리 (삭제, 수정)
 * selected : 제품 카테고리 선택 여부
 */

/**
 * setAllCategories : 카테고리 목록 받아오기
 * setCurrentCategory: 선택된 카테고리 정보
 * selectCategoryTrue : 카테고리 선택 true
 * selectCategoryFalse : 카테고리 선택 false
 */

interface productCategoryInitialState {
  categories: {
    categoryName: string,
    id: number,
    image: {
      id: number,
      originalFilename: string,
      serverFilename: string
    }
  }[],
  currentCategory: {
    categoryName: string,
    id: number,
    image: {
      id: number,
      originalFilename: string,
      serverFilename: string
    }
  },
  selected: boolean
};

const ProductCategoryInitialState: productCategoryInitialState = {
  categories: [],
  currentCategory: {
    categoryName: '',
    id: 0,
    image: {
      id: 0,
      originalFilename: '',
      serverFilename: ''
    }
  },
  selected: false
};

export const ProductCategorySlice = createSlice({
  name: 'productCategory',
  initialState: ProductCategoryInitialState,
  reducers: {
    setAllCategories: (
      state,
      action: PayloadAction<{
        categories: {
          categoryName: string,
          id: number,
          image: {
            id: number,
            originalFilename: string,
            serverFilename: string
          }
        }[]
      }>
    ) => { state.categories = action.payload.categories },
    setCurrentCategory: (
      state,
      action: PayloadAction<{
        category: {
          categoryName: string,
          id: number,
          image: {
            id: number,
            originalFilename: string,
            serverFilename: string
          }
        }
      }>
    ) => { state.currentCategory = action.payload.category },
    selectCategoryTrue: (state) => { state.selected = true },
    selectCategoryFalse: (state) => { state.selected = false },
  }
});

export const {
  setAllCategories,
  setCurrentCategory,
  selectCategoryTrue,
  selectCategoryFalse } = ProductCategorySlice.actions;
export default ProductCategorySlice.reducer;