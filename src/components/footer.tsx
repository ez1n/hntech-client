import React from 'react';
import './style.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clickManagerLogin, clickChangeMode } from '../app/reducers/managerModeSlice';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from '@mui/material';

export default function Footer() {
  const dispatch = useAppDispatch();

  const managerLogin = useAppSelector(state => state.manager.managerLogin);
  const managerMode = useAppSelector(state => state.manager.managerMode);

  // 임시 데이터
  const data = {
    address: '경기도 용인시 처인구 모현읍 외개일로 20번길 9-14',
    as: '000-000-000',
    tel: '031-337-4005',
    fax: '031-337-4006'
  }

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
        <img className='logoImage' src='/images/logo.png' alt='HNTECH logo' />
        <img className='logoKor' src='/images/korLogo.png' alt='korean logo' />
      </Stack>

      {/* 회사 정보 */}
      <Stack direction='row' sx={{ width: '60%', m: 'auto' }}>
        <Box sx={{ width: 'max-content', flex: 0.7 }}>
          <Typography sx={{ color: '#FCFCFC', opacity: 0.8, mb: 1 }}>
            본사 : {data.address}
          </Typography>

          <Stack direction='row' spacing={3}>
            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              A/S : {data.as}
            </Typography>

            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              TEL : {data.tel}
            </Typography>

            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              FAX : {data.fax}
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
          onClick={managerMode ? () => dispatch(clickChangeMode()) : () => dispatch(clickManagerLogin())}
          sx={{
            color: '#FCFCFC',
            opacity: 0.6
          }}>
          {managerMode ? '로그아웃' : '관리자 모드'}
        </Button>
      </Box>

      <Dialog
        open={managerLogin}
        onClose={() => dispatch(clickManagerLogin())}>
        <DialogTitle>
          관리자 모드
        </DialogTitle>

        <DialogContent>
          <DialogContentText>비밀번호</DialogContentText>
          <TextField type={'password'} inputProps={{ maxLength: 4 }} />
        </DialogContent>

        <DialogActions>
          {/* 로그인 확인 이벤트 추가해야함 */}
          <Button onClick={() => {
            dispatch(clickChangeMode());
            dispatch(clickManagerLogin());
          }}>
            로그인
          </Button>
          <Button onClick={() => dispatch(clickManagerLogin())}>취소</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
};

