import React from 'react';
import { Typography } from '@mui/material';

export default function ProductInfo() {
  // 임시데이터
  const images = [
    {
      url: '/images/mainButtons/알람밸브조립.jpg'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg'
    }
  ];

  // 임시 데이터
  const productName = '플러쉬'

  return (
    <>
      <Typography sx={{ textAlign: 'start' }}>
        {productName}
      </Typography>
      {images.map((item, index) => (
        <img key={index} src={item.url} width='100px' alt={`${productName}`} />
      ))}
      <Typography>
        아파트와 같은 주거공간의 발코니에 설치되는 제품
      </Typography>
    </>
  )
};