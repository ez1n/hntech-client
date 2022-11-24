import React, {useState} from 'react';
import {adminApi} from '../network/admin';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {clickManagerLogin} from '../app/reducers/dialogSlice';
import {changeMode, copyManagerData, setManagerData} from '../app/reducers/adminSlice';
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
  const [password, setPassword] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  // 비밀번호 입력
  const getPassword = (e: any) => setPassword(e.target.value);

  // 다이얼로그 - close
  const onClose = () => {
    dispatch(clickManagerLogin());
    setLoginErrorMsg('');
  };

  // 관리자 패널 정보
  const getPanelInfo = () => {
    adminApi.getPanelInfo()
      .then(res => {
        dispatch(setManagerData({panelData: res}));
        dispatch(copyManagerData({panelData: res}));
      })
      .catch(error => console.log(error))
  };

  // 로그인
  const postLogin = () => {
    adminApi.postLogin({password: password})
      .then(res => {
        setLoginErrorMsg('');
        setPassword('');
        dispatch(clickManagerLogin());
        localStorage.setItem("login", res.result);
        const isLogin = localStorage.getItem("login");
        dispatch(changeMode({login: isLogin}));

        getPanelInfo();
      })
      .catch(error => setLoginErrorMsg(error.response.data.message))
  };

  const onLoginEnterKey = (event: any) => {
    if (event.key === 'Enter') {
      postLogin()
    }
  };

  return (
    <Dialog open={loginState} onClose={onClose}>
      <DialogTitle>
        관리자 로그인
      </DialogTitle>

      <DialogContent>
        <DialogContentText>비밀번호</DialogContentText>
        <TextField
          error={!!loginErrorMsg}
          helperText={loginErrorMsg}
          required
          autoFocus
          autoComplete='off'
          type={'password'}
          onChange={getPassword}
          onKeyUp={onLoginEnterKey}/>
      </DialogContent>

      <DialogActions>
        <Button onClick={postLogin}> 로그인 </Button>
        <Button onClick={onClose}> 취소 </Button>
      </DialogActions>
    </Dialog>
  )
};

