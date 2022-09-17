import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Button, Tooltip, Typography, styled } from '@mui/material';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import DescriptionIcon from '@mui/icons-material/Description';

export default function SideMenu() {
  const navigate = useNavigate();

  const afterService = useAppSelector(state => state.manager.footer.afterService); // footer 정보 state

  return (
    <SideButtonContainer style={{ padding: 0 }} sx={{ zIndex: 100, display: 'flex', flexDirection: 'column', position: 'fixed', top: '35%', left: 5 }}>
      <SideButton onClick={() => navigate('/data')}>
        <DescriptionIcon sx={{ fontSize: 30, mb: 1 }} />
        <Typography sx={{ fontSize: 13 }}>카다록</Typography>
        <Typography sx={{ fontSize: 13 }}>자재승인서</Typography>
      </SideButton>

      <SideButton onClick={() => navigate('/archive')}>
        <ArchiveRoundedIcon sx={{ fontSize: 30, mb: 1 }} />
        <Typography sx={{ fontSize: 13 }}>자료실</Typography>
      </SideButton>

      <Tooltip
        title={
          <React.Fragment>
            <Typography>{afterService}</Typography>
          </React.Fragment>
        }
        arrow
        placement='right'>
        <SideButton onClick={() => navigate('/question')}>
          <BuildRoundedIcon sx={{ fontSize: 30, mb: 1, color: '#FCFCFC' }} />
          <Typography sx={{ fontSize: 13, color: '#FCFCFC' }}>A/S</Typography>
        </SideButton>
      </Tooltip>
    </SideButtonContainer>
  )
}

// Media Query
const SideButtonContainer = styled('div')(({ theme }) => ({
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