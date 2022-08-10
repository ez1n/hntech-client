import { createSlice } from "@reduxjs/toolkit";

// 제품 사진 state
interface productImageInitialState {
  activeStep: number,
  dialog: boolean
};

const ProductImageInitialState: productImageInitialState = {
  activeStep: 0,
  dialog: false
};

// 제품 사진 업데이트
export const ProductImageSlice = createSlice({
  name: 'product',
  initialState: ProductImageInitialState,
  reducers: {
    nextImage: (state) => { state.activeStep = state.activeStep + 1 },
    prevImage: (state) => { state.activeStep = state.activeStep - 1 },
    clickGoBack: (state) => { state.dialog = !(state.dialog) }
  }
});

export const { nextImage, prevImage, clickGoBack } = ProductImageSlice.actions;
export default ProductImageSlice.reducer;