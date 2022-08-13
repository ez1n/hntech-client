import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 상세보기

/**
 * productList : 제품 목록
 * productDetail : 제품 정보
 * activeStep : 보여지는 제품 이미지 번호
 */

/**
 * getProductList : 제품 목록 받아오기
 * getProductDetail : 제품 정보 받아오기
 * nextImage : 다음 이미지
 * prevImage : 이전 이미지
 */

interface productInitialState {
  productList: { url: string, title: string }[],
  productDetail: { image: string[], data: { name: string, info: string, category: string } },
  activeStep: number
};

const ProductInitialState: productInitialState = {
  productList: [],
  productDetail: { image: [], data: { name: '', info: '', category: '' } },
  activeStep: 0
};

export const ProductSlice = createSlice({
  name: 'product',
  initialState: ProductInitialState,
  reducers: {
    getProductList: (
      state,
      action: PayloadAction<{ productList: { url: string, title: string }[] }>
    ) => { state.productList = action.payload.productList },
    getProductDetail: (
      state,
      action: PayloadAction<{ detail: { image: string[], data: { name: string, info: string, category: string } } }>
    ) => { state.productDetail = action.payload.detail },
    nextImage: (state) => { state.activeStep = state.activeStep + 1 },
    prevImage: (state) => { state.activeStep = state.activeStep - 1 }
  }
}
);

export const {
  getProductList,
  getProductDetail,
  nextImage,
  prevImage } = ProductSlice.actions;
export default ProductSlice.reducer;