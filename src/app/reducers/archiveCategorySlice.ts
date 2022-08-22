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
  category: { id: number, categoryName: string }[],
};

const ArchiveCategoryInitialState: archiveCategoryInitialState = {
  category: [{ id: 0, categoryName: '' },],
};

export const ArchiveCategorySlice = createSlice({
  name: 'archiveCategory',
  initialState: ArchiveCategoryInitialState,
  reducers: {
    getArchiveCategory: (
      state,
      action: PayloadAction<{ categories: { id: number, categoryName: string }[] }>
    ) => { state.category = action.payload.categories }
  }
});

export const { getArchiveCategory } = ArchiveCategorySlice.actions;
export default ArchiveCategorySlice.reducer;