import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Container, styled } from '@mui/material';
import { api } from '../../network/network';

export default function Specification() {
  const managerMode = useAppSelector(state => state.manager.managerMode);
  const productDetail = useAppSelector(state => state.product.productDetail); // 제품 정보

  return (
    <Container>
      <Box>
        {productDetail.files.standardImages.map((item: {
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

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;