import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProductCategories from './productCategories';

export default function Products() {
  return (
    <Box sx={{ p: 5 }}>
      {/* 소제목 */}
      <Container sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Typography
          variant='h5'
          sx={{
            p: 1,
            width: 'max-content',
            borderBottom: '3px solid #2E7D32',
          }}>
          제품 소개
        </Typography>
      </Container>

      {/* 카테고리 */}
      <ProductCategories />
    </Box>
  )
}