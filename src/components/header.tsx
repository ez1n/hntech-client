import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  mouseOverCompany,
  mouseOverProduct,
  mouseOverService,
  mouseLeaveCompany,
  mouseLeaveProduct,
  mouseLeaveService
} from '../app/reducers/menusSlice';
import { Toolbar, Typography, Button, Stack, Box, Paper } from '@mui/material';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 

  const openCompany = useAppSelector((state) => state.company.value); // 회사소개 state
  const openProduct = useAppSelector((state) => state.product.value); // 제품소개 state
  const openService = useAppSelector((state) => state.service.value); // 고객지원 state

  const onClickMenu = (menu: string) => { navigate(menu) }; // 페이지 이동 이벤트

  return (
    <Toolbar sx={{ pt: 2, pb: 2, position: 'sticky', top: 0 }}>
      {/* 로고 */}
      <Button sx={{ pl: 5, pr: 5 }} onClick={() => onClickMenu('/')}>
        {/* 로고 이미지 - 서버에서 받아오기 */}
        <img className='logoImage' src='/images/logo.png' alt='HNTECH logo' />
        <Typography sx={{ ml: 3, fontSize: '2.5em', fontWeight: 'bold', color: '#0F0F0F' }}>HNTECH</Typography>
      </Button>

      {/* 메뉴 */}
      <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-around' }}>
        {/* 회사소개 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveCompany())}>
          <Button
            onMouseOver={() => dispatch(mouseOverCompany())}
            sx={{ fontSize: '1.3em', color: '#0F0F0F' }}>
            회사소개
          </Button>
          {openCompany &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute'
              }}>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                인사말
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                회사 연혁
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                조직도
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                CI 소개
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                찾아오시는 길
              </Button>
            </Paper>
          }
        </Box>

        {/* 제품소개 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveProduct())}>
          <Button
            onMouseOver={() => dispatch(mouseOverProduct())}
            sx={{ fontSize: '1.3em', color: '#0F0F0F' }}>
            제품소개
          </Button>
          {openProduct &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                스프링클러헤드
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                유수제어밸브
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                기타
              </Button>
            </Paper>
          }
        </Box>

        {/* 고객지원 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveService())}>
          <Button
            onMouseOver={() => dispatch(mouseOverService())}
            sx={{ fontSize: '1.3em', color: '#0F0F0F' }}>
            고객지원
          </Button>
          {openService &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                카다록 및 자재승인서
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                자료실
              </Button>
              <Button
                sx={{
                  justifyContent: 'center',
                  fontSize: 13,
                  color: '#0F0F0F',
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 82, 0.2)',
                  },
                }}>
                고객문의
              </Button>
            </Paper>
          }
        </Box>
      </Stack>
    </Toolbar>
  )
};
