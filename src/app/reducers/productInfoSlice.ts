import { createSlice } from "@reduxjs/toolkit";

// 제품 카테고리 선택 state
interface productImageInitialState {
  activeStep: number
};

const ProductImageInitialState: productImageInitialState = {
  activeStep: 0
};

// 카테고리 선택 업데이트
export const ProductImageSlice = createSlice({
  name: 'product',
  initialState: ProductImageInitialState,
  reducers: {
    nextImage: (state) => { state.activeStep = state.activeStep + 1 },
    prevImage: (state) => { state.activeStep = state.activeStep - 1 }
  }
});

export const { nextImage, prevImage } = ProductImageSlice.actions;
export default ProductImageSlice.reducer;