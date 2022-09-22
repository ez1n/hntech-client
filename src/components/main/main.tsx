import React from 'react';
import {Box} from '@mui/material';
import Banner from './banner';
import Representation from './representation';

export default function Main() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Banner/>
      <Representation/>
    </Box>
  )
};

