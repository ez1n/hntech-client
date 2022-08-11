import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 카테고리 state
interface archiveCategoryInitialState {
  category: string[]
};

const ArchiveCategoryInitialState: archiveCategoryInitialState = {
  category: []
};

// 카테고리 업데이트
export const ArchiveCategorySlice = createSlice({
  name: 'archiveCategory',
  initialState: ArchiveCategoryInitialState,
  reducers: {
    // 카테고리 리스트 받아오기
    getArchiveCategory: (
      state,
      action: PayloadAction<{ categories: string[] }>
    ) => { state.category = action.payload.categories },

    // 카테고리 추가
    updateArchiveCategory: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newCategory = [...state.category, action.payload.item];
      state.category = newCategory;
    },

    // 카테고리 삭제
    deleteArchiveCategory: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const newCategory = state.category.filter((item, index) => index != action.payload.index);
      state.category = newCategory;
    }
  }
});

export const { getArchiveCategory, updateArchiveCategory, deleteArchiveCategory } = ArchiveCategorySlice.actions;
export default ArchiveCategorySlice.reducer;