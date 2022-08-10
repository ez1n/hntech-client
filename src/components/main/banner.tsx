import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Banner() {
  return (
    // 배너 삽입 (배경, 멘트)
    <Box sx={{ backgroundColor: 'skyblue' }}>
      <Typography variant='h3'>
        banner
      </Typography>
    </Box>
  )
};