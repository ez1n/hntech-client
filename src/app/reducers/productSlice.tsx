import { createSlice } from "@reduxjs/toolkit";

interface productInitialState {
  selected: boolean
};

const ProductInitialState: productInitialState = {
  selected: false
};

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