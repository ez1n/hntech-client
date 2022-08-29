import React, { useEffect } from 'react';
import './style.css';
import { adminApi } from '../network/admin';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clickChangeMode,
  copyManagerData,
  setFooter,
  setManagerData,
  setPassword
} from '../app/reducers/managerModeSlice';
import { clickLogoutGoBack, clickManagerLogin } from '../app/reducers/dialogSlice';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CancelModal from './cancelModal';
import { api } from '../network/network';

export default function Footer() {
  const dispatch = useAppDispatch();

  const loginState = useAppSelector(state => state.dialog.loginState); // 로그인 dialog state
  const logoutState = useAppSelector(state => state.dialog.logoutState); // 로그아웃 state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const footer = useAppSelector(state => state.manager.footer); // footer 정보 state
  const password = useAppSelector(state => state.manager.password); // 관리자 비밀번호 state
  const logo = useAppSelector(state => state.manager.logo); // 회사 로고

  // 로그인
  const postLogin = () => {
    adminApi.postLogin(password)
      .then(res => {
        dispatch(clickChangeMode());
        dispatch(clickManagerLogin());

        // 관리자 패널 정보 받아오기
        adminApi.getPanelInfo()
          .then(res => {
            dispatch(setManagerData({ panelData: res }));
            dispatch(copyManagerData({ panelData: res }));
          })
      })
      .catch(error => console.log('password', error))
  };

  // 로그아웃
  const getLogout = () => {
    adminApi.getLogout()
      .then(res => {
        dispatch(clickLogoutGoBack());
        dispatch(clickChangeMode());
      })
  };

  return (
    <Box sx={{ p: 3, pb: 0, mt: 10, backgroundColor: '#042709' }}>
      {/* 로고 */}
      <Stack
        direction='row'
        spacing={2}
        sx={{
          m: 'auto',
          mb: 3,
          width: '60%',
          display: 'flex',
          alignItems: 'center'
        }}>
        <img className='logoImage' src={`${api.baseUrl()}/files/admin/${logo.serverFilename}`} alt='HNTECH logo' />
        <img className='logoKor' src='/images/korLogo.png' alt='korean logo' />
      </Stack>

      {/* 회사 정보 */}
      <Stack direction='row' sx={{ width: '60%', m: 'auto' }}>
        <Box sx={{ width: 'max-content', flex: 0.7 }}>
          <Typography sx={{ color: '#FCFCFC', opacity: 0.8, mb: 1 }}>
            본사 : {footer.address}
          </Typography>

          <Stack direction='row' spacing={3}>
            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              A/S : {footer.afterService}
            </Typography>

            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              TEL : {footer.phone}
            </Typography>

            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              FAX : {footer.fax}
            </Typography>
          </Stack>

          <Typography sx={{ color: '#FCFCFC', opacity: 0.8, mt: 2 }}>
            https://www.hntec.co.kr
          </Typography>
        </Box>

        {/* FAMILY SITE */}
        <Box sx={{ flex: 0.3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ color: '#FCFCFC', opacity: 0.8, mb: 1 }}>
            FAMILY SITE
          </Typography>

          <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
            한국소방산업기술원
          </Typography>

          <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
            한국소방안전협회
          </Typography>
        </Box>
      </Stack>

      {/* 관리자 모드 버튼 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <Button
          onClick={managerMode ? () => dispatch(clickLogoutGoBack()) : () => dispatch(clickManagerLogin())}
          sx={{
            color: '#FCFCFC',
            opacity: 0.6
          }}>
          {managerMode ? '로그아웃' : '관리자 모드'}
        </Button>
      </Box>

      {/* 관리자 모드 로그인 dialog */}
      <Dialog
        open={loginState}
        onClose={() => dispatch(clickManagerLogin())}>
        <DialogTitle>
          관리자 모드 로그인
        </DialogTitle>

        <DialogContent>
          <DialogContentText>비밀번호</DialogContentText>
          <TextField type={'password'} onChange={event => dispatch(setPassword({ password: event?.target.value }))} inputProps={{ maxLength: 4 }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={postLogin}>
            로그인
          </Button>
          <Button onClick={() => dispatch(clickManagerLogin())}>취소</Button>
        </DialogActions>
      </Dialog>

      {/* 로그아웃 dialog */}
      <CancelModal
        openState={logoutState}
        title={'관리자 로그아웃'}
        text1={'로그아웃 하시겠습니까?'}
        text2={''}
        yesAction={() => getLogout()}
        closeAction={() => dispatch(clickLogoutGoBack())}
      />
    </Box>
  )
};

