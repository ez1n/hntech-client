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

  const openCompany = useAppSelector(state => state.menu.company); // 회사소개 state
  const openProduct = useAppSelector(state => state.menu.product); // 제품소개 state
  const openService = useAppSelector(state => state.menu.service); // 고객지원 state
  const mode = useAppSelector(state => state.mode.managerMode); // 모드 state

  function DropdownMenu({ menu }: { menu: string }) {
    return (
      <Button
        sx={{
          justifyContent: 'center',
          fontSize: 13,
          color: '#0F0F0F',
          transition: 'ease-in 0.5s',
          '&:hover': {
            backgroundColor: 'rgba(57, 150, 82, 0.2)',
          },
        }}>
        {menu}
      </Button>
    )
  };

  return (
    <Toolbar sx={{ zIndex: 2, pt: 2, pb: 2, position: 'sticky', top: 0, backgroundColor: `${mode ? '#B5C3B3' : '#FFFFFF'}` }}>
      {/* 로고 */}
      <Button sx={{ pl: 5, pr: 5 }} onClick={() => navigate('/')}>
        <Stack direction='column'>
          {/* 로고 이미지 - 서버에서 받아오기 */}
          <Stack direction='row'>
            <img className='logoImage' src='/images/logo.png' alt='HNTECH logo' />
            <Typography sx={{ ml: 3, fontSize: '2.5em', fontWeight: 'bold', color: '#0F0F0F' }}>HNTECH</Typography>
          </Stack>
          {/* 관리자 모드 */}
          {mode &&
            <Typography
              sx={{
                position: 'absolute',
                top: '3.5em',
                left: '9.5em',
                color: '#0F0F0F',
                fontWeight: 'bold'
              }}>
              관리자 모드
            </Typography>
          }
        </Stack>
      </Button>

      {/* 메뉴 */}
      <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-around' }}>
        {/* 회사소개 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveCompany())}>
          <Button
            onMouseOver={() => dispatch(mouseOverCompany())}
            sx={{
              fontSize: '1.3em',
              color: '#0F0F0F',
              transition: '0.5s',
              '&:hover': {
                backgroundColor: 'rgba(57, 150, 82, 0.1)',
                transform: 'scale(1.02)'
              }
            }}>
            회사소개
          </Button>
          {openCompany &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute'
              }}>
              {DropdownMenu({ menu: '인사말' })}
              {DropdownMenu({ menu: '회사 연혁' })}
              {DropdownMenu({ menu: '조직도' })}
              {DropdownMenu({ menu: 'CI 소개' })}
              {DropdownMenu({ menu: '찾아오시는 길' })}
            </Paper>
          }
        </Box>

        {/* 제품소개 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveProduct())}>
          <Button
            onMouseOver={() => dispatch(mouseOverProduct())}
            sx={{
              fontSize: '1.3em',
              color: '#0F0F0F',
              transition: '0.5s',
              '&:hover': {
                backgroundColor: 'rgba(57, 150, 82, 0.1)',
                transform: 'scale(1.02)'
              }
            }}>
            제품소개
          </Button>
          {openProduct &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              {DropdownMenu({ menu: '스프링클러헤드' })}
              {DropdownMenu({ menu: '유수제어밸브' })}
              {DropdownMenu({ menu: '기타' })}
            </Paper>
          }
        </Box>

        {/* 고객지원 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveService())}>
          <Button
            onMouseOver={() => dispatch(mouseOverService())}
            sx={{
              fontSize: '1.3em',
              color: '#0F0F0F',
              transition: '0.5s',
              '&:hover': {
                backgroundColor: 'rgba(57, 150, 82, 0.1)',
                transform: 'scale(1.02)'
              }
            }}>
            고객지원
          </Button>
          {openService &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              {DropdownMenu({ menu: '카다록 및 자재승인서' })}
              {DropdownMenu({ menu: '자료실' })}
              {DropdownMenu({ menu: '고객문의' })}
            </Paper>
          }
        </Box>
      </Stack>
    </Toolbar>
  )
};
