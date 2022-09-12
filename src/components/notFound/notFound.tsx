import React from 'react';
import { Typography, Box, styled, Container } from '@mui/material';

export default function NotFound() {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography sx={{ fontSize: 'xx-large', fontWeight: 'bold' }}>Not Found</Typography>
      <Spacing />
      <Typography sx={{ fontSize: 'xx-large', fontWeight: 'bold' }}>페이지를 찾을 수 없습니다.</Typography>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;