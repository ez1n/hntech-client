import { createSlice } from "@reduxjs/toolkit";

// 제품 카테고리 선택 state
interface productInitialState {
  selected: boolean
};

const ProductInitialState: productInitialState = {
  selected: false
};

// 카테고리 선택 업데이트
export const ProductSlice = createSlice({
  name: 'category',
  initialState: ProductInitialState,
  reducers: {
    selectCategoryTrue: (state) => { state.selected = true },
    selectCategoryFalse: (state) => { state.selected = false }
  }
});

export const { selectCategoryTrue, selectCategoryFalse } = ProductSlice.actions;
export default ProductSlice.reducer;