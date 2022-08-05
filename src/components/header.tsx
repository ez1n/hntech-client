import React from 'react';
import './style.css';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Toolbar, Typography, Button, Stack, Box, Paper } from '@mui/material';
import {
  mouseOverCompany,
  mouseOverProduct,
  mouseOverArchive,
  mouseOverService,
  mouseLeaveCompany,
  mouseLeaveProduct,
  mouseLeaveArchive,
  mouseLeaveService
} from '../app/reducers/menusSlice';
import {
  clickChangeIntroduce,
  clickChangeHistory,
  clickChangeOrgChart,
  clickChangeInfo,
  clickChangeLocation
} from '../app/reducers/companySlice';
import {
  selectCategoryTrue,
  selectCategoryFalse
} from '../app/reducers/productSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const openCompany = useAppSelector(state => state.menu.company); // 회사소개 state
  const openProduct = useAppSelector(state => state.menu.product); // 제품소개 state
  const openArchive = useAppSelector(state => state.menu.archive); // 고객지원 state
  const openService = useAppSelector(state => state.menu.service); // 고객지원 state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

  // 임시 데이터 (제품 카테고리)
  const categoryMenus = ['스프링쿨러헤드', '유수베어밸브', '유리벌브', '기타'];

  return (
    <Toolbar
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        pt: 2,
        pb: 2,
        backgroundColor: `${managerMode ? '#B5C3B3' : '#FCFCFC'}`
      }}>
      {/* 로고 */}
      <Button sx={{ pl: 5, pr: 5 }} onClick={() => navigate('/')}>
        <Stack direction='column'>
          {/* 로고 이미지 - 서버에서 받아오기 */}
          <Stack direction='row'>
            <img className='logoImage' src='/images/logo.png' alt='HNTECH logo' />
            <Typography sx={{ ml: 3, fontSize: '2.5em', fontWeight: 'bold', color: '#0F0F0F' }}>HNTECH</Typography>
          </Stack>
          {/* 관리자 모드 */}
          {managerMode &&
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
          <MainMenu
            onMouseOver={() => dispatch(mouseOverCompany())}
            onClick={() => {
              navigate('/company');
              dispatch(clickChangeIntroduce());
            }}
          >
            회사소개
          </MainMenu>
          {openCompany &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute'
              }}>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeIntroduce())
                }}>
                인사말
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeHistory())
                }}>
                회사 연혁
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeOrgChart())
                }}>
                조직도
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeInfo())
                }}>
                CI 소개
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeLocation())
                }}>
                찾아오시는 길
              </DropdownMenu>
            </Paper>
          }
        </Box>

        {/* 제품소개 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveProduct())}>
          <MainMenu
            onMouseOver={() => dispatch(mouseOverProduct())}
            onClick={() => {
              navigate('/product');
              dispatch(selectCategoryFalse());
            }}
          >
            제품소개
          </MainMenu>
          {/* 통신으로 목록 받아오기 */}
          {openProduct &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              {categoryMenus.map(item => (
                <DropdownMenu
                  onClick={() => {
                    navigate('/product');
                    dispatch(selectCategoryTrue());
                  }}>
                  {item}
                </DropdownMenu>
              ))}
            </Paper>
          }
        </Box>

        {/* 자료실 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveArchive())}>
          <MainMenu
            onMouseOver={() => dispatch(mouseOverArchive())}
          >
            자료실
          </MainMenu>
          {openArchive &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <DropdownMenu onClick={() => console.log('#')}>카다록 및 자재승인서</DropdownMenu>
              <DropdownMenu onClick={() => console.log('#')}>고객 자료실</DropdownMenu>
            </Paper>
          }
        </Box>

        {/* 고객지원 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveService())}>
          <MainMenu
            onMouseOver={() => dispatch(mouseOverService())}
          >
            고객지원
          </MainMenu>
          {openService &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <DropdownMenu onClick={() => console.log('#')}>고객문의</DropdownMenu>
            </Paper>
          }
        </Box>
      </Stack>
    </Toolbar>
  )
};

// 상위 메뉴 버튼
const MainMenu = styled(Button)(() => ({
  fontSize: '1.3em',
  color: '#0F0F0F',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.1)',
    transform: 'scale(1.02)'
  }
})) as typeof Button;

// 하위 메뉴 버튼
const DropdownMenu = styled(Button)(() => ({
  justifyContent: 'center',
  fontSize: 13,
  color: '#0F0F0F',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  },
})) as typeof Button;