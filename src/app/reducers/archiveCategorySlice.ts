import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//자료실 카테고리

/**
 * category : 자료실 카테고리 목록
 */

/**
 * getArchiveCategory : 카테고리 목록 받아오기
 * addArchiveCategory : 카테고리 추가
 * deleteArchiveCategory : 카테고리 삭제
 */

interface archiveCategoryInitialState {
  category: string[]
};

const ArchiveCategoryInitialState: archiveCategoryInitialState = {
  category: []
};

export const ArchiveCategorySlice = createSlice({
  name: 'archiveCategory',
  initialState: ArchiveCategoryInitialState,
  reducers: {
    getArchiveCategory: (
      state,
      action: PayloadAction<{ categories: string[] }>
    ) => { state.category = action.payload.categories },
    addArchiveCategory: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newCategory = [...state.category, action.payload.item];
      state.category = newCategory;
    },
    deleteArchiveCategory: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const newCategory = state.category.filter((item, index) => index != action.payload.index);
      state.category = newCategory;
    }
  }
});

export const { getArchiveCategory, addArchiveCategory, deleteArchiveCategory } = ArchiveCategorySlice.actions;
export default ArchiveCategorySlice.reducer;