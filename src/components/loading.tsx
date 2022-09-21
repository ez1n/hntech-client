import React from 'react';
import {useAppSelector} from '../app/hooks';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  const loading = useAppSelector(state => state.dialog.loading);

  return (
    <Backdrop
      sx={{color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={loading}
    >
      <CircularProgress color="inherit"/>
    </Backdrop>
  )
};