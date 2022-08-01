import React from 'react';
import './style.css';
import { useAppDispatch } from '../app/hooks';
import { clickChangeMode } from '../app/reducers/menusSlice';
import { Box, Button, Stack, Typography } from '@mui/material';

export default function Footer() {
  const dispatch = useAppDispatch();

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
            본사 : 경기도 용인시 처인구 모현읍 외개일로 20번길 9-14
          </Typography>

          <Stack direction='row' spacing={3}>
            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              A/S : 000-000-000
            </Typography>

            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              TEL : 000-000-0000
            </Typography>

            <Typography sx={{ color: '#FCFCFC', opacity: 0.8 }}>
              FAX : 000-000-0000
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
        onClick={() => dispatch(clickChangeMode())}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <Button sx={{ color: '#FCFCFC', opacity: 0.6 }}>관리자 모드</Button>
      </Box>
    </Box>
  )
};

