import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 카테고리 ( 자료실 카테고리, 제품 카테고리)

/**
 * archiveCategory : 자료실 카테고리 목록
 * productCategoryImagePath : 제품 카테고리 이미지 미리보기 url
 * productCategoryName : 제품 카테고리 이름
 * productCategoryImage : 전송할 제품 카테고리 이미지 정보
 * productMainCategories : 메인 제품 카테고리 목록
 * productCategories : 제품 카테고리 목록
 * productCurrentCategory : 선택한 제품 카테고리 (삭제, 수정)
 * productCategorySelected : 제품 카테고리 선택 여부 (true, false) -> true 인경우 카테고리 목록 이미지 사라지고 제품 종류 나열
 */

/**
 * getArchiveCategory : 자료실 카테고리 목록 받아오기
 * addProductCategoryImage : 제품 카테고리 이미지 경로 추가
 * deleteProductCategoryImage : 제품 카테고리 이미지 삭제
 * updateProductCategoryName : 제품 카테고리 이름 입력
 * updateProductCategoryImage : 제품 카테고리 이미지 입력
 * setMainCategories : 제품 메인 카테고리 받아오기
 * setAllProductCategories : 제품 카테고리 목록 받아오기
 * setCurrentProductCategory : 선택된 제품 카테고리 정보
 * updateCurrentProductCategoryName : 제품 카테고리 수정시 선택된 카테고리 이름
 * updateCurrentProductCategoryImage : 전송할 제품 카테고리 이미지
 * selectProductCategoryTrue : 제품 카테고리 선택 true
 * selectProductCategoryFalse : 제품 카테고리 선택 false
 */

interface categoryInitialState {
  archiveCategory: { id: number, categoryName: string }[],
  productCategoryImagePath: string | null,
  productCategoryName: string,
  productCategoryImage: string,
  productMainCategories: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    sequence: number
  }[],
  productCategories: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    sequence: number
  }[],
  productCurrentCategory: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    sequence: number
  },
  productCategorySelected: boolean,
};

const CategoryInitialState: categoryInitialState = {
  archiveCategory: [{ id: 0, categoryName: '' },],
  productCategoryImagePath: null,
  productCategoryName: '',
  productCategoryImage: '',
  productMainCategories: [{
    categoryName: '',
    id: 0,
    imageServerFilename: '',
    sequence: 0
  },],
  productCategories: [{
    categoryName: '',
    id: 0,
    imageServerFilename: '',
    sequence: 0
  },],
  productCurrentCategory: {
    categoryName: '',
    id: 0,
    imageServerFilename: '',
    sequence: 0
  },
  productCategorySelected: false,
};

export const CategorySlice = createSlice({
  name: 'category',
  initialState: CategoryInitialState,
  reducers: {
    getArchiveCategory: (
      state,
      action: PayloadAction<{ categories: { id: number, categoryName: string }[] }>
    ) => { state.archiveCategory = action.payload.categories },
    addProductCategoryImage: (
      state,
      action: PayloadAction<{ image: string | null }>
    ) => { state.productCategoryImagePath = action.payload.image },
    deleteProductCategoryImage: (state) => { state.productCategoryImagePath = null },
    updateProductCategoryName: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => { state.productCategoryName = action.payload.categoryName },
    updateProductCategoryImage: (
      state,
      action: PayloadAction<{ categoryImage: string }>
    ) => { state.productCategoryImage = action.payload.categoryImage },
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
    ) => { state.productMainCategories = action.payload.categories },
    setAllProductCategories: (
      state,
      action: PayloadAction<{
        categories: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          sequence: number
        }[]
      }>
    ) => { state.productCategories = action.payload.categories },
    setCurrentProductCategory: (
      state,
      action: PayloadAction<{
        category: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          sequence: number
        }
      }>
    ) => { state.productCurrentCategory = action.payload.category },
    updateCurrentProductCategoryName: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => { state.productCurrentCategory.categoryName = action.payload.categoryName },
    updateCurrentProductCategoryImage: (
      state,
      action: PayloadAction<{ image: string }>
    ) => { state.productCurrentCategory.imageServerFilename = action.payload.image },
    selectProductCategoryTrue: (state) => { state.productCategorySelected = true },
    selectProductCategoryFalse: (state) => { state.productCategorySelected = false },
  }
});

export const {
  getArchiveCategory,
  addProductCategoryImage,
  deleteProductCategoryImage,
  updateProductCategoryName,
  updateProductCategoryImage,
  setMainCategories,
  setAllProductCategories,
  setCurrentProductCategory,
  updateCurrentProductCategoryName,
  updateCurrentProductCategoryImage,
  selectProductCategoryTrue,
  selectProductCategoryFalse } = CategorySlice.actions;
export default CategorySlice.reducer;