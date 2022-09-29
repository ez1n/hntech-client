import React, {useState} from 'react';
import {adminApi} from '../network/admin';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {clickManagerLogin} from '../app/reducers/dialogSlice';
import {changeMode, copyManagerData, setManagerData, setPassword} from '../app/reducers/managerModeSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';

export default function Login() {
  const dispatch = useAppDispatch();

  const loginState = useAppSelector(state => state.dialog.loginState); // 로그인 dialog state
  const password = useAppSelector(state => state.manager.password); // 관리자 비밀번호 state
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  // 관리자 패널 정보
  const getPanelInfo = () => {
    adminApi.getPanelInfo()
      .then(res => {
        dispatch(setManagerData({panelData: res}));
        dispatch(copyManagerData({panelData: res}));
      })
  };

  // 로그인
  const postLogin = () => {
    adminApi.postLogin(password)
      .then(res => {
        setLoginErrorMsg('');
        dispatch(clickManagerLogin());
        dispatch(setPassword({password: ''}));
        localStorage.setItem("login", res.result);
        const isLogin = localStorage.getItem("login");
        dispatch(changeMode({login: isLogin}));

        getPanelInfo();
      })
      .catch(error => {
        setLoginErrorMsg(error.response.data.message);
      })
  };

  const onLoginEnterKey = (event: any) => {
    if (event.key === 'Enter') {
      postLogin()
    }
  };

  return (
    < Dialog
      open={loginState}
      onClose={() => {
        dispatch(clickManagerLogin());
        setLoginErrorMsg('');
      }
      }>
      <DialogTitle>
        관리자 모드 로그인
      </DialogTitle>

      <DialogContent>
        <DialogContentText>비밀번호</DialogContentText>
        <TextField
          error={!!loginErrorMsg}
          helperText={loginErrorMsg}
          required
          autoFocus={true}
          autoComplete='off'
          type={'password'}
          onChange={event => dispatch(setPassword({password: event?.target.value}))}
          onKeyUp={onLoginEnterKey}/>
      </DialogContent>

      <DialogActions>
        <Button onClick={postLogin}>
          로그인
        </Button>
        <Button
          onClick={() => {
            dispatch(clickManagerLogin());
            setLoginErrorMsg('');
          }}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
};

