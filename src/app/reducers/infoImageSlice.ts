import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* *
* 제품 state
*/

interface infoImageInitialState {
  productPath: string[]
};

const InfoImageInitialState: infoImageInitialState = {
  productPath: []
};

export const InfoImageSlice = createSlice({
  name: 'productImage',
  initialState: InfoImageInitialState,
  reducers: {
    addProductImagePath: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newPath = [...state.productPath, action.payload.item];
      state.productPath = newPath;
    },
    deleteProductImagePath: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newPath = state.productPath.filter((path, index) => index !== action.payload.num);
      state.productPath = newPath;
    }
  }
});

export const { addProductImagePath, deleteProductImagePath } = InfoImageSlice.actions;
export const InfoImageReducer = InfoImageSlice.reducer;


/* *
* 규격 이미지 state
*/

interface gradeImageInitialState {
  gradePath: string[]
};

const GradeImageInitialState: gradeImageInitialState = {
  gradePath: []
};

export const GradeImageSlice = createSlice({
  name: 'gradeImage',
  initialState: GradeImageInitialState,
  reducers: {
    addGradeImagePath: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newPath = [...state.gradePath, action.payload.item];
      state.gradePath = newPath;
    },
    deleteGradeImagePath: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newPath = state.gradePath.filter((path, index) => index !== action.payload.num)
      state.gradePath = newPath;
    }
  }
});

export const { addGradeImagePath, deleteGradeImagePath } = GradeImageSlice.actions;
export const GradeImageReducer = GradeImageSlice.reducer;

