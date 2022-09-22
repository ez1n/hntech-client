import React from 'react';
import {api} from '../../network/network';
import {useAppSelector} from '../../app/hooks';
import {Box, Container} from '@mui/material';

export default function Specification() {
  const standardImages = useAppSelector(state => state.product.productDetail.files.standardImages); // 제품 정보

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box>
        {standardImages.map((item: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }) => (
          <img key={item.id} src={`${api.baseUrl()}/files/product/${item.serverFilename}`} width={'100%'}
               alt={item.originalFilename}/>
        ))}
      </Box>
    </Container>
  )
};