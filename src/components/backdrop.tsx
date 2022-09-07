import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useAppSelector } from '../app/hooks';

export default function Backdrop() {
  const backdropState = useAppSelector(state => state.dialog.backdrop);

  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: 100 }}
        open={backdropState}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}
