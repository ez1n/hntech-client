import React from 'react';
import { Box, Container, styled } from '@mui/material';
import ProductCategories from '../products/productCategories';
import ProductInfo from './productInfo';
import Files from './files';
import Specification from './specification';

export default function ProductDetail() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* 카테고리 */}
      <Box sx={{ flex: 0.3 }}>
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

      {/* 제품 정보 */}
      <Box sx={{ flex: 0.7, pt: 5, mr: '10%', textAlign: 'center' }}>
        <ProductInfo />

        <Spacing />

        <Files />

        <Spacing />

        <Specification />
      </Box>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;