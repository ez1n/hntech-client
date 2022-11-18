import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 카테고리 ( 자료실 카테고리, 제품 카테고리)

/**
 * archiveCategory : 자료실 카테고리 목록
 * productMainCategories : 메인 제품 카테고리 목록
 * productCategories : 제품 카테고리 목록
 * productCurrentCategory : 선택한 제품 카테고리 (삭제, 수정)
 * productCategorySelected : 제품 카테고리 선택 여부 (true, false) -> true 인경우 카테고리 목록 이미지 사라지고 제품 종류 나열
 * currentProductCategoryName : 현재 선택한 카테고리 이름
 */

/**
 * getArchiveCategory : 자료실 카테고리 목록 받아오기
 * setMainCategories : 제품 메인 카테고리 받아오기
 * setAllProductCategories : 대분류 제품 카테고리 목록 받아오기
 * setCurrentProductCategory : 선택된 대분류 제품 카테고리 정보
 * setCurrentProductCategoryName : 선택한 대분류 제품 카테고리 이름 업데이트
 * getMiddleProductCategory  : 중분류 제품 카테고리 받아오기
 * setCurrentProductMiddleCategory : 선택된 중분류 제품 카테고리 정보
 * setCurrentProductMiddleCategoryName : 선택한 중분류 제품 카테고리 이름 업데이트
 */

interface categoryInitialState {
  archiveCategory: { id: number, categoryName: string, isArchiveCategory: boolean }[],
  productMainCategories: {
    categoryName: string,
    id: number,
    imageServerFilename: string
  }[],
  productCategories: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string
  }[],
  productCurrentCategory: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string
  },
  productMiddleCategories: {
    id: number,
    categoryName: string,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string,
    parent: string,
    children: string[]
  }[],
  currentProductMiddleCategory: {
    id: number,
    categoryName: string,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string,
    parent: string,
    children: string[]
  },
  updateCategoryImageState: boolean,
  currentProductCategoryName: string,
  currentProductMiddleCategoryName: string

}

const CategoryInitialState: categoryInitialState = {
  archiveCategory: [{id: 0, categoryName: '', isArchiveCategory: true},],
  productMainCategories: [],
  productCategories: [],
  productCurrentCategory: {
    categoryName: '',
    id: 0,
    imageServerFilename: '',
    imageOriginalFilename: '',
    showInMain: ''
  },
  productMiddleCategories: [],
  currentProductMiddleCategory: {
    id: 0,
    categoryName: '',
    imageServerFilename: '',
    imageOriginalFilename: '',
    showInMain: '',
    parent: '',
    children: []
  },
  updateCategoryImageState: false,
  currentProductCategoryName: '',
  currentProductMiddleCategoryName: ''
};

export const CategorySlice = createSlice({
  name: 'category',
  initialState: CategoryInitialState,
  reducers: {
    getArchiveCategory: (
      state,
      action: PayloadAction<{ categories: { id: number, categoryName: string, isArchiveCategory: boolean }[] }>
    ) => {
      state.archiveCategory = action.payload.categories;
    },
    setMainCategories: (
      state,
      action: PayloadAction<{
        categories: {
          categoryName: string,
          id: number,
          imageServerFilename: string
        }[]
      }>
    ) => {
      state.productMainCategories = action.payload.categories
    },
    setAllProductCategories: (
      state,
      action: PayloadAction<{
        categories: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          imageOriginalFilename: string,
          showInMain: string
        }[]
      }>
    ) => {
      state.productCategories = action.payload.categories
    },
    setCurrentProductCategory: (
      state,
      action: PayloadAction<{
        category: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          imageOriginalFilename: string,
          showInMain: string
        }
      }>
    ) => {
      state.productCurrentCategory = action.payload.category
    },
    setCurrentProductCategoryName: (
      state,
      action: PayloadAction<{ category: string }>
    ) => {
      state.currentProductCategoryName = action.payload.category
    },
    getMiddleProductCategory: (
      state,
      action: PayloadAction<{
        category: {
          id: number,
          categoryName: string,
          imageServerFilename: string,
          imageOriginalFilename: string,
          showInMain: string,
          parent: string,
          children: string[]
        }[]
      }>
    ) => {
      state.productMiddleCategories = action.payload.category
    },
    setCurrentProductMiddleCategory: (
      state,
      action: PayloadAction<{
        category: {
          id: number,
          categoryName: string,
          imageServerFilename: string,
          imageOriginalFilename: string,
          showInMain: string,
          parent: string,
          children: string[]
        }
      }>
    ) => {
      state.currentProductMiddleCategory = action.payload.category
    },
    setCurrentProductMiddleCategoryName: (
      state,
      action: PayloadAction<{ category: string }>
    ) => {
      state.currentProductMiddleCategoryName = action.payload.category
    },
  }
});

export const {
  getArchiveCategory,
  setMainCategories,
  setAllProductCategories,
  setCurrentProductCategory,
  setCurrentProductCategoryName,
  getMiddleProductCategory,
  setCurrentProductMiddleCategory,
  setCurrentProductMiddleCategoryName
} = CategorySlice.actions;
export default CategorySlice.reducer;