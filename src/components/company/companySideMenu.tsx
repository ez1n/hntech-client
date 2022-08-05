import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {
  clickChangeIntroduce,
  clickChangeHistory,
  clickChangeOrgChart,
  clickChangeInfo,
  clickChangeLocation
} from '../../app/reducers/companySlice';
import { styled } from '@mui/system';
import { Box, Button, Container, Typography } from '@mui/material';

export default function CompanySideMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box sx={{
      ml: '50%',
      pt: 1,
      pb: 1,
      mt: 5,
      borderLeft: '4px solid rgb(46, 125, 50)'
    }}>

      {/* title (회사소개) */}
      <Container>
        <Typography
          variant='h5'
          sx={{
            pl: 1,
            pb: 2
          }}>
          회사소개
        </Typography>
      </Container>

      {/* 하위 메뉴 */}
      <MenuButton onClick={() => {
        dispatch(clickChangeIntroduce())
        navigate('/company');
      }}>
        인사말
      </MenuButton>
      <MenuButton onClick={() => {
        dispatch(clickChangeHistory())
        navigate('/company');
      }}>
        회사 연혁
      </MenuButton>
      <MenuButton onClick={() => {
        dispatch(clickChangeOrgChart())
        navigate('/company');
      }}>
        조직도
      </MenuButton>
      <MenuButton onClick={() => {
        dispatch(clickChangeInfo())
        navigate('/company');
      }}>
        CI 소개
      </MenuButton>
      <MenuButton onClick={() => {
        dispatch(clickChangeLocation())
        navigate('/company');
      }}>
        찾아오시는 길
      </MenuButton>
    </Box>
  )
};

const MenuButton = styled(Button)(() => ({
  padding: 10,
  marginLeft: 20,
  width: '100%',
  color: '#0F0F0F',
  fontSize: 15,
  marginBottom: 2,
  borderRadius: 5,
  justifyContent: 'flex-start',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.1)',
    transform: 'scale(1.02)',
    fontWeight: 'bold'
  }
}))