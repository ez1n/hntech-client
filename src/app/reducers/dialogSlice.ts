import {createSlice} from "@reduxjs/toolkit";

// 알림창

/**
 * loginState : 로그인
 * passwordState : 관리자 비밀번호
 * productItemState : 제품 삭제
 * productCategoryFormState : 제품 카테고리 등록 취소
 * productCategoryFormState : 제품 카테고리 폼 등록 / 수정
 * commentRemoveState : 댓글 삭제
 * archiveState : 자료실 카테고리 수정
 * loading : 글쓰기 처리중
 */

/**
 * clickManagerLogin : 로그인
 * clickPasswordStateGoBack : 비밀번호 변경
 * clickProductCategoryFormGoBack : 제품 카테고리 등록 / 수정
 * clickProductItemGoBack
 * clickCommentRemoveGoBack
 * clickArchivesGoBack
 * onLoading
 */

interface dialogInitialState {
  loginState: boolean,
  passwordState: boolean,
  productItemState: boolean,
  productCategoryFormState: boolean,
  productCategoryListState: boolean,
  commentRemoveState: boolean,
  archiveState: boolean,
  loading: boolean
};

const DialogInitialState: dialogInitialState = {
  loginState: false,
  passwordState: false,
  productItemState: false,
  productCategoryFormState: false,
  productCategoryListState: false,
  commentRemoveState: false,
  archiveState: false,
  loading: false
};

export const DialogSlice = createSlice({
  name: 'dialog',
  initialState: DialogInitialState,
  reducers: {
    clickManagerLogin: state => {
      state.loginState = !state.loginState
    },
    clickPasswordStateGoBack: state => {
      state.passwordState = !state.passwordState
    },
    clickProductItemGoBack: state => {
      state.productItemState = !state.productItemState
    },
    clickProductCategoryFormGoBack: state => {
      state.productCategoryFormState = !state.productCategoryFormState
    },
    clickCommentRemoveGoBack: state => {
      state.commentRemoveState = !state.commentRemoveState
    },
    clickArchivesGoBack: state => {
      state.archiveState = !state.archiveState
    },
    onLoading: state => {
      state.loading = !state.loading
    }
  }
});

export const {
  clickManagerLogin,
  clickPasswordStateGoBack,
  clickProductItemGoBack,
  clickProductCategoryFormGoBack,
  clickCommentRemoveGoBack,
  clickArchivesGoBack,
  onLoading
} = DialogSlice.actions;
export default DialogSlice.reducer;