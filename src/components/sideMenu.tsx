import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Button, Tooltip, Typography } from '@mui/material';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import DescriptionIcon from '@mui/icons-material/Description';

export default function SideMenu() {
  const navigate = useNavigate();

  //임시데이터
  const data = { as: '000-000-0000' }

  return (
    <SideButtonContainer style={{ padding: 0 }} sx={{ zIndex: 100, display: 'flex', flexDirection: 'column', position: 'fixed', top: '35%', left: 5 }}>
      <SideButton onClick={() => navigate('/data')}>
        <DescriptionIcon sx={{ fontSize: 30, mb: 1 }} />
        <Typography sx={{ fontSize: 13 }}>카다록</Typography>
        <Typography sx={{ fontSize: 13 }}>자재승인서</Typography>
      </SideButton>

      <SideButton onClick={() => navigate('/question')}>
        <SmsRoundedIcon sx={{ fontSize: 30, mb: 1 }} />
        <Typography sx={{ fontSize: 13 }}>문의사항</Typography>
      </SideButton>

      <Tooltip title={data.as} arrow placement='right'>
        <SideButton>
          <BuildRoundedIcon sx={{ fontSize: 30, mb: 1, color: '#FCFCFC' }} />
          <Typography sx={{ fontSize: 13, color: '#FCFCFC' }}>A/S</Typography>
        </SideButton>
      </Tooltip>
    </SideButtonContainer>
  )
}

// Media Query
const SideButtonContainer = styled('div')(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  display: 'block'
}));

// 버튼 스타일
const SideButton = styled(Button)(() => ({
  width: 90,
  height: 90,
  fontSize: 15,
  variant: 'contained',
  display: 'flex',
  flexDirection: 'column',
  border: '2px solid rgb(46, 125, 50)',
  borderRadius: 15,
  backgroundColor: 'rgb(46, 125, 50)',
  color: '#FCFCFC',
  marginBottom: 5,
  transition: '1s',
  '&: hover': {
    transform: 'scale(1.04)',
    backgroundColor: 'rgba(50, 150, 70)'
  }
})) as typeof Button;