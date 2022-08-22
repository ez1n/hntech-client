import { createSlice } from "@reduxjs/toolkit";

// 알림창

/**
 * loginState : 로그인
 * logoutState : 로그아웃
 * passwordState : 관리자 비밀번호
 * sendMailPasswordState : 발송 메일 비밀번호
 * productCategoryState : 제품 카테고리 삭제
 * productFormState : 제품 등록 취소
 * productModifyFormState : 제품 정보 변경 취소
 * productInfoState : 
 * productCategoryFormState : 제품 카테고리 폼 등록 / 수정
 * questionFormState : 문의사항 등록 취소
 * questionDetailState : 
 * commentState : 댓글 등록
 * archiveState : 자료실 카테고리 수정
 * archiveFormState : 자료실 글쓰기 취소
 * archiveDetailState : 자료실 게시글 삭제
 * editArchiveCategoryState : 자료실 카테고리 수정
 * archiveModifyFormState : 자료실 글 수정
 * editState : 관리자 정보 수정 (drawer)
 * questionStatusState : 문의사항 처리 상태
 */

/**
 * clickLogoutGoBack : 로그아웃 취소
 * clickProductCategoryGoBack : 
 * clickPasswordStateGoBack : 비밀번호 변경 취소
 * clickSendMailPasswordStateGoBack : 발송 메일 비밀번호 변경 취소
 * clickProductFormGoBack : 
 * clickProductModifyFormGoBack : 
 * clickProductInfoGoBack : 
 * clickProductCategoryFormGoBack : 제품 카테고리 등록 / 수정 취소
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
 * clickQuestionStatusGoBack : 문의사항 처리상태 변경
 */

interface dialogInitialState {
  loginState: boolean,
  logoutState: boolean,
  passwordState: boolean,
  sendMailPasswordState: boolean,
  productCategoryState: boolean,
  productFormState: boolean,
  productModifyFormState: boolean,
  productInfoState: boolean,
  productItemState: boolean,
  productCategoryFormState: boolean,
  questionFormState: boolean,
  questionDetailState: boolean,
  questionModifyFormState: boolean,
  commentState: boolean,
  commentRemoveState: boolean,
  archiveState: boolean,
  archiveFormState: boolean,
  archiveDetailState: boolean,
  archiveModifyFormState: boolean,
  editState: boolean,
  questionStatusState: boolean
};

const DialogInitialState: dialogInitialState = {
  loginState: false,
  logoutState: false,
  passwordState: false,
  sendMailPasswordState: false,
  productCategoryState: false,
  productFormState: false,
  productModifyFormState: false,
  productInfoState: false,
  productItemState: false,
  productCategoryFormState: false,
  questionFormState: false,
  questionDetailState: false,
  questionModifyFormState: false,
  commentState: false,
  commentRemoveState: false,
  archiveState: false,
  archiveFormState: false,
  archiveDetailState: false,
  archiveModifyFormState: false,
  editState: false,
  questionStatusState: false
};

export const DialogSlice = createSlice({
  name: 'dialog',
  initialState: DialogInitialState,
  reducers: {
    clickManagerLogin: (state) => { state.loginState = !state.loginState },
    clickLogoutGoBack: (state) => { state.logoutState = !state.logoutState },
    clickPasswordStateGoBack: (state) => { state.passwordState = !state.passwordState },
    clickSendMailPasswordStateGoBack: (state) => { state.sendMailPasswordState = !state.sendMailPasswordState },
    clickProductCategoryGoBack: (state) => { state.productCategoryState = !state.productCategoryState },
    clickProductFormGoBack: (state) => { state.productFormState = !state.productFormState },
    clickProductModifyFormGoBack: (state) => { state.productModifyFormState = !state.productModifyFormState },
    clickProductInfoGoBack: (state) => { state.productInfoState = !state.productInfoState },
    clickProductItemGoBack: (state) => { state.productItemState = !state.productItemState },
    clickProductCategoryFormGoBack: (state) => { state.productCategoryFormState = !state.productCategoryFormState },
    clickQuestionFormGoBack: (state) => { state.questionFormState = !state.questionFormState },
    clickQuestionDetailGoBack: (state) => { state.questionDetailState = !state.questionDetailState },
    clickQuestionModifyFormGoBack: (state) => { state.questionModifyFormState = !state.questionModifyFormState },
    clickCommentGoBack: (state) => { state.commentState = !state.commentState },
    clickCommentRemoveGoBack: (state) => { state.commentRemoveState = !state.commentRemoveState },
    clickArchivesGoBack: (state) => { state.archiveState = !state.archiveState },
    archiveFormGoBack: (state) => { state.archiveFormState = !state.archiveFormState },
    archiveDetailGoBack: (state) => { state.archiveDetailState = !state.archiveDetailState },
    clickArchiveModifyFormGoBack: (state) => { state.archiveModifyFormState = !state.archiveModifyFormState },
    clickEditGoBack: (state) => { state.editState = !state.editState },
    clickQuestionStatusGoBack: (state) => { state.questionStatusState = !state.questionStatusState }
  }
});

export const {
  clickManagerLogin,
  clickLogoutGoBack,
  clickPasswordStateGoBack,
  clickSendMailPasswordStateGoBack,
  clickProductCategoryGoBack,
  clickProductFormGoBack,
  clickProductModifyFormGoBack,
  clickProductInfoGoBack,
  clickProductItemGoBack,
  clickProductCategoryFormGoBack,
  clickQuestionFormGoBack,
  clickQuestionDetailGoBack,
  clickQuestionModifyFormGoBack,
  clickCommentGoBack,
  clickCommentRemoveGoBack,
  clickArchivesGoBack,
  archiveFormGoBack,
  archiveDetailGoBack,
  clickArchiveModifyFormGoBack,
  clickEditGoBack,
  clickQuestionStatusGoBack } = DialogSlice.actions;
export default DialogSlice.reducer;