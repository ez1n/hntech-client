import React from 'react';
import {api} from '../../network/network';
import {useAppSelector} from '../../app/hooks';
import {Box, Typography} from '@mui/material';

export default function Specification() {
  const standardImages = useAppSelector(state => state.product.productDetail.files.standardImages); // 제품 정보

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '2px solid rgba(158,183,152,0.25)'
    }}>
      <Typography sx={{
        width: '100%',
        pt: 1,
        pb: 1,
        mb: 3,
        backgroundColor: '#21381CFF',
        color: '#FCFCFC',
        fontSize: 20,
        fontWeight: 'bold',
        border: '2px solid #21381CFF'
      }}>
        상 세 정 보
      </Typography>
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
    </Box>
  )
};