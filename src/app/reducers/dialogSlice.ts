import { createSlice } from "@reduxjs/toolkit";

// 알림창

/**
 * productCategoryState : 
 * productFormState : 
 * productModifyFormState : 
 * productInfoState : 
 * questionFormState : 
 * noticeFormState : 
 * questionDetailState : 
 * commentState : 댓글 등록
 * archivesState : 자료실 카테고리 수정
 * archiveFormState : 
 * archiveDetailState : 
 * editArchiveCategoryState : 
 * archiveModifyFormState : 자료실 글 수정
 * editState : 
 */

/**
 * clickProductCategoryGoBack : 
 * clickProductFormGoBack : 
 * clickProductModifyFormGoBack : 
 * clickProductInfoGoBack : 
 * clickQuestionFormGoBack : 
 * clickNoticeFormGoBack : 
 * clickQuestionDetailGoBack : 
 * clickCommentGoBack : 댓글 등록 취소
 * archivesGoBack : 자료실 카테고리 수정 취소
 * archiveFormGoBack : 
 * archiveDetailGoBack : 
 * editArchiveCategoryGoBack : 
 * clickArchiveModifyFormGoBack : 자료실 글 수정 취소
 * clickEditGoBack : 
 */

interface dialogInitialState {
  productCategoryState: boolean,
  productFormState: boolean,
  productModifyFormState: boolean,
  productInfoState: boolean,
  productItemState: boolean,
  questionFormState: boolean,
  noticeFormState: boolean,
  questionDetailState: boolean,
  questionModifyFormState: boolean,
  commentState: boolean,
  commentRemoveState: boolean,
  archivesState: boolean,
  archiveFormState: boolean,
  archiveDetailState: boolean,
  archiveModifyFormState: boolean,
  editState: boolean
};

const DialogInitialState: dialogInitialState = {
  productCategoryState: false,
  productFormState: false,
  productModifyFormState: false,
  productInfoState: false,
  productItemState: false,
  questionFormState: false,
  noticeFormState: false,
  questionDetailState: false,
  questionModifyFormState: false,
  commentState: false,
  commentRemoveState: false,
  archivesState: false,
  archiveFormState: false,
  archiveDetailState: false,
  archiveModifyFormState: false,
  editState: false
};

export const DialogSlice = createSlice({
  name: 'dialog',
  initialState: DialogInitialState,
  reducers: {
    clickProductCategoryGoBack: (state) => { state.productCategoryState = !state.productCategoryState },
    clickProductFormGoBack: (state) => { state.productFormState = !state.productFormState },
    clickProductModifyFormGoBack: (state) => { state.productModifyFormState = !state.productModifyFormState },
    clickProductInfoGoBack: (state) => { state.productInfoState = !state.productInfoState },
    clickProductItemGoBack: (state) => { state.productItemState = !state.productItemState },
    clickQuestionFormGoBack: (state) => { state.questionFormState = !state.questionFormState },
    clickNoticeFormGoBack: (state) => { state.noticeFormState = !state.noticeFormState },
    clickQuestionDetailGoBack: (state) => { state.questionDetailState = !state.questionDetailState },
    clickQuestionModifyFormGoBack: (state) => { state.questionModifyFormState = !state.questionModifyFormState },
    clickCommentGoBack: (state) => { state.commentState = !state.commentState },
    clickCommentRemoveGoBack: (state) => { state.commentRemoveState = !state.commentRemoveState },
    clickArchivesGoBack: (state) => { state.archivesState = !state.archivesState },
    archiveFormGoBack: (state) => { state.archiveFormState = !state.archiveFormState },
    archiveDetailGoBack: (state) => { state.archiveDetailState = !state.archiveDetailState },
    clickArchiveModifyFormGoBack: (state) => { state.archiveModifyFormState = !state.archiveModifyFormState },
    clickEditGoBack: (state) => { state.editState = !state.editState }
  }
});

export const {
  clickProductCategoryGoBack,
  clickProductFormGoBack,
  clickProductModifyFormGoBack,
  clickProductInfoGoBack,
  clickProductItemGoBack,
  clickQuestionFormGoBack,
  clickNoticeFormGoBack,
  clickQuestionDetailGoBack,
  clickQuestionModifyFormGoBack,
  clickCommentGoBack,
  clickCommentRemoveGoBack,
  clickArchivesGoBack,
  archiveFormGoBack,
  archiveDetailGoBack,
  clickArchiveModifyFormGoBack,
  clickEditGoBack } = DialogSlice.actions;
export default DialogSlice.reducer;