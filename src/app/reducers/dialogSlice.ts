import {createSlice} from "@reduxjs/toolkit";

// 알림창

/**
 * loginState : 로그인
 * passwordState : 관리자 비밀번호
 * loading : 로딩
 */

/**
 * clickManagerLogin : 로그인
 * clickPasswordStateGoBack : 비밀번호 변경
 * onLoading : 로딩
 */

interface dialogInitialState {
  loginState: boolean,
  passwordState: boolean,
  loading: boolean
}

const DialogInitialState: dialogInitialState = {
  loginState: false,
  passwordState: false,
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
    onLoading: state => {
      state.loading = !state.loading
    }
  }
});

export const {
  clickManagerLogin,
  clickPasswordStateGoBack,
  onLoading
} = DialogSlice.actions;
export default DialogSlice.reducer;