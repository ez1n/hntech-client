import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Banner() {
  return (
    // 배너 삽입 (배경, 멘트)
    <Box sx={{ display: 'flex', height: '500px', backgroundColor: 'skyblue', alignItem: 'center', justifyContent: 'center' }}>
      <Typography variant='h3' sx={{ display: 'flex', alignItems: 'center' }}>
        banner
      </Typography>
    </Box>
  )
};