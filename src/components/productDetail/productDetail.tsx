import React from 'react';
import { Box } from '@mui/material';
import ProductCategories from '../products/productCategories';
import ProductInfo from './productInfo';
import Files from './files';
import Specification from './specification';

export default function ProductDetail() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: 0.2 }}>
        <Box sx={{
          ml: '50%',
          pt: 1,
          pb: 1,
          mt: 5,
          borderLeft: '4px solid rgb(46, 125, 50)',
          minWidth: '130px'
        }}>
          <ProductCategories />
        </Box>
      </Box>

      <Box sx={{ flex: 0.8, pt: 5, mr: '10%', textAlign: 'center' }}>
        <ProductInfo />
        <Files />
        <Specification />
      </Box>
    </Box>
  )
}