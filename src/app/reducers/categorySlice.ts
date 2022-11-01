import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 카테고리 ( 자료실 카테고리, 제품 카테고리)

/**
 * archiveCategory : 자료실 카테고리 목록
 * selectedArchiveCategoryId : 선택한 자료실 카테고리 id
 * productCategoryImagePath : 제품 카테고리 이미지 미리보기 url
 * productCategoryName : 제품 카테고리 이름
 * productCategoryImage : 전송할 제품 카테고리 이미지 정보
 * productCategoryShowInMain : 메인 카테고리 설정
 * productMainCategories : 메인 제품 카테고리 목록
 * productCategories : 제품 카테고리 목록
 * productCurrentCategory : 선택한 제품 카테고리 (삭제, 수정)
 * productCategorySelected : 제품 카테고리 선택 여부 (true, false) -> true 인경우 카테고리 목록 이미지 사라지고 제품 종류 나열
 * currentProductCategoryName : 현재 선택한 카테고리 이름

 */

/**
 * getArchiveCategory : 자료실 카테고리 목록 받아오기
 * setSelectedArchiveCategoryId : 현재 선택한 자료실 카테고리 아이디 업데이트
 * addProductCategoryImage : 제품 카테고리 이미지 경로 추가
 * updateProductCategoryName : 제품 카테고리 이름 입력
 * updateProductCategoryImage : 제품 카테고리 이미지 입력
 * updateProductCategoryShowInMain : 메인 제품 카테고리 설정
 * setMainCategories : 제품 메인 카테고리 받아오기
 * setAllProductCategories : 제품 카테고리 목록 받아오기
 * setCurrentProductCategory : 선택된 제품 카테고리 정보
 * updateCurrentProductCategoryName : 제품 카테고리 수정시 선택된 카테고리 이름
 * selectProductCategoryTrue : 제품 카테고리 선택 true
 * selectProductCategoryFalse : 제품 카테고리 선택 false
 * setCurrentProductCategoryName : 선택한 카테고리 이름 업데이트
 */

interface categoryInitialState {
  archiveCategory: { id: number, categoryName: string, showInMain: string }[],
  selectedArchiveCategoryId: number | undefined,
  productCategoryImagePath: string | undefined,
  productCategoryName: string,
  productCategoryImage: string,
  productCategoryShowInMain: string,
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
  productMiddleCategory: {
    id: number,
    categoryName: string,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string,
    parent: string,
    children: []
  }[],
  updateCategoryImageState: boolean,
  currentProductCategoryName: string
}

const CategoryInitialState: categoryInitialState = {
  archiveCategory: [{id: 0, categoryName: '', showInMain: ''},],
  selectedArchiveCategoryId: undefined,
  productCategoryImagePath: undefined,
  productCategoryName: '',
  productCategoryImage: '',
  productCategoryShowInMain: 'false',
  productMainCategories: [],
  productCategories: [],
  productCurrentCategory: {
    categoryName: '',
    id: 0,
    imageServerFilename: '',
    imageOriginalFilename: '',
    showInMain: ''
  },
  productMiddleCategory: [],
  updateCategoryImageState: false,
  currentProductCategoryName: ''
};

export const CategorySlice = createSlice({
  name: 'category',
  initialState: CategoryInitialState,
  reducers: {
    getArchiveCategory: (
      state,
      action: PayloadAction<{ categories: { id: number, categoryName: string, showInMain: string }[] }>
    ) => {
      state.archiveCategory = action.payload.categories;
    },
    setSelectedArchiveCategoryId: (
      state,
      action: PayloadAction<{ id: number | undefined }>
    ) => {
      state.selectedArchiveCategoryId = action.payload.id
    },
    addProductCategoryImage: (
      state,
      action: PayloadAction<{ image: string | undefined }>
    ) => {
      state.productCategoryImagePath = action.payload.image
    },
    updateProductCategoryName: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => {
      state.productCategoryName = action.payload.categoryName
    },
    updateProductCategoryImage: (
      state,
      action: PayloadAction<{ categoryImage: string }>
    ) => {
      state.productCategoryImage = action.payload.categoryImage
    },
    updateProductCategoryShowInMain: (
      state,
      action: PayloadAction<{ showInMain: boolean }>
    ) => {
      state.productCategoryShowInMain = String(action.payload.showInMain)
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
    updateCurrentProductCategoryName: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => {
      state.productCurrentCategory.categoryName = action.payload.categoryName
    },
    updateCurrentProductCategoryShowInMain: (
      state,
      action: PayloadAction<{ showInMain: boolean }>
    ) => {
      state.productCurrentCategory.showInMain = String(action.payload.showInMain)
    },
    setCurrentProductCategoryName: (
      state,
      action: PayloadAction<{ category: string }>
    ) => {
      state.currentProductCategoryName = action.payload.category
    },
    getMiddleProductCategory: (
      state,
        action: PayloadAction<{category: {
            id: number,
            categoryName: string,
            imageServerFilename: string,
            imageOriginalFilename: string,
            showInMain: string,
            parent: string,
            children: []
          }[]}>
    ) => {
      state.productMiddleCategory = action.payload.category
    }
  }
});

export const {
  getArchiveCategory,
  setSelectedArchiveCategoryId,
  addProductCategoryImage,
  updateProductCategoryName,
  updateProductCategoryImage,
  updateProductCategoryShowInMain,
  setMainCategories,
  setAllProductCategories,
  setCurrentProductCategory,
  updateCurrentProductCategoryName,
  updateCurrentProductCategoryShowInMain,
  setCurrentProductCategoryName
} = CategorySlice.actions;
export default CategorySlice.reducer;