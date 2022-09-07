import React, { useState } from 'react';
import './style.css';
import { adminApi } from '../network/admin';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clickChangeMode,
  copyManagerData,
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
  styled,
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
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  // 로그인
  const postLogin = () => {
    adminApi.postLogin(password)
      .then(res => {
        setLoginErrorMsg('');
        dispatch(clickChangeMode());
        dispatch(clickManagerLogin());

        // 관리자 패널 정보 받아오기
        adminApi.getPanelInfo()
          .then(res => {
            dispatch(setManagerData({ panelData: res }));
            dispatch(copyManagerData({ panelData: res }));
          })
      })
      .catch(error => {
        setLoginErrorMsg(error.response.data.message);
      })
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
      <LogoStack direction='row' spacing={2}>
        <img className='logoImage' src={`${api.baseUrl()}/files/admin/${logo.serverFilename}`} alt='HNTECH logo' />
        <img className='logoKor' src='/images/korLogo.png' alt='korean logo' />
      </LogoStack>

      {/* 회사 정보 */}
      <FooterStack direction='row'>
        <InfoBox>
          <ContentTypography sx={{ mb: 1 }}>
            본사 : {footer.address}
          </ContentTypography>

          <ContentBox>
            <ContentTypography>
              A/S : {footer.afterService}
            </ContentTypography>

            <ContentTypography>
              TEL : {footer.phone}
            </ContentTypography>

            <ContentTypography>
              FAX : {footer.fax}
            </ContentTypography>
          </ContentBox>

          <ContentTypography sx={{ mt: 2 }}>
            https://www.hntec.co.kr
          </ContentTypography>
        </InfoBox>

        {/* FAMILY SITE */}
        <SiteBox>
          <ContentTypography sx={{ mb: 1 }}>
            FAMILY SITE
          </ContentTypography>

          <ContentTypography>
            한국소방산업기술원
          </ContentTypography>

          <ContentTypography>
            한국소방안전협회
          </ContentTypography>
        </SiteBox>
      </FooterStack>

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
        onClose={() => {
          dispatch(clickManagerLogin());
          setLoginErrorMsg('');
        }}>
        <DialogTitle>
          관리자 모드 로그인
        </DialogTitle>

        <DialogContent>
          <DialogContentText>비밀번호</DialogContentText>
          <TextField
            error={loginErrorMsg ? true : false}
            helperText={loginErrorMsg}
            type={'password'}
            onChange={event => dispatch(setPassword({ password: event?.target.value }))}
            inputProps={{ maxLength: 4 }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={postLogin}>
            로그인
          </Button>
          <Button onClick={() => {
            dispatch(clickManagerLogin());
            setLoginErrorMsg('');
          }}>취소</Button>
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

const LogoStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    width: '80% !important'
  },
  margin: 'auto',
  marginBottom: 15,
  width: '60%',
  display: 'flex',
  alignItems: 'center'
})) as typeof Stack;

const FooterStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    width: '80% !important'
  },
  width: '60%',
  margin: 'auto'
})) as typeof Stack;

const InfoBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    flex: 0.6,
  },
  width: 'max-content',
  flex: 0.7
})) as typeof Box;

const ContentBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap'
  },
  display: 'flex'
})) as typeof Box;

const ContentTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 'small'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    marginRight: 10
  },
  color: '#FCFCFC',
  opacity: 0.8,
  marginRight: 15
})) as typeof Typography;

const SiteBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flex: 0.4
  },
  flex: 0.3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
})) as typeof Box;