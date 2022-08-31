import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Container, styled } from '@mui/material';
import { api } from '../../network/network';

export default function Specification() {
  const standardImages = useAppSelector(state => state.product.productDetail.files.standardImages); // 제품 정보

  return (
    <Container>
      <Box>
        {standardImages.map((item: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }) => (
          <img key={item.id} src={`${api.baseUrl()}/files/product/${item.serverFilename}`} width={300} alt={item.originalFilename} />
        ))}
      </Box>
    </Container>
  )
};