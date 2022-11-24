import React from 'react';
import {Typography, Box, styled, Container, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const moveMainPage = () => navigate('/');

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography sx={{fontSize: 'xx-large', fontWeight: 'bold'}}>페이지를 찾을 수 없습니다.</Typography>
      <Spacing/>
      
      <Button onClick={moveMainPage} variant={'contained'} color={'info'}>메인 페이지로 돌아가기</Button>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;