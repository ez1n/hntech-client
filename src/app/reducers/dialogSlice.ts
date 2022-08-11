import { createSlice } from "@reduxjs/toolkit";

// 알림창 state
interface dialogInitialState {
  productCategoryState: boolean,
  productFormState: boolean,
  productModifyFormState: boolean,
  productInfoState: boolean,
  questionFormState: boolean,
  noticeFormState: boolean,
  questionDetailState: boolean,
  archivesState: boolean,
  archiveFormState: boolean,
  archiveDetailState: boolean,
  editArchiveCategoryState: boolean,
  editState: boolean
};

const DialogInitialState: dialogInitialState = {
  productCategoryState: false,
  productFormState: false,
  productModifyFormState: false,
  productInfoState: false,
  questionFormState: false,
  noticeFormState: false,
  questionDetailState: false,
  archivesState: false,
  archiveFormState: false,
  archiveDetailState: false,
  editArchiveCategoryState: false,
  editState: false
};

// 알림창 open, close
export const DialogSlice = createSlice({
  name: 'dialog',
  initialState: DialogInitialState,
  reducers: {
    clickProductCategoryGoBack: (state) => { state.productCategoryState = !state.productCategoryState },
    clickProductFormGoBack: (state) => { state.productFormState = !state.productFormState },
    clickProductModifyFormGoBack: (state) => { state.productModifyFormState = !state.productModifyFormState },
    clickProductInfoGoBack: (state) => { state.productInfoState = !state.productInfoState },
    clickQuestionFormGoBack: (state) => { state.questionFormState = !state.questionFormState },
    clickNoticeFormGoBack: (state) => { state.noticeFormState = !state.noticeFormState },
    clickQuestionDetailGoBack: (state) => { state.questionDetailState = !state.questionDetailState },
    archivesGoBack: (state) => { state.archivesState = !state.archivesState },
    archiveFormGoBack: (state) => { state.archiveFormState = !state.archiveFormState },
    archiveDetailGoBack: (state) => { state.archiveDetailState = !state.archiveDetailState },
    editArchiveCategoryGoBack: (state) => { state.editArchiveCategoryState = !state.editArchiveCategoryState },
    clickEditGoBack: (state) => { state.editState = !state.editState }
  }
});

export const {
  clickProductCategoryGoBack,
  clickProductFormGoBack,
  clickProductModifyFormGoBack,
  clickProductInfoGoBack,
  clickQuestionFormGoBack,
  clickNoticeFormGoBack,
  clickQuestionDetailGoBack,
  archivesGoBack,
  archiveFormGoBack,
  archiveDetailGoBack,
  editArchiveCategoryGoBack,
  clickEditGoBack } = DialogSlice.actions;
export default DialogSlice.reducer;