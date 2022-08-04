import React from 'react';
import { Box, Button, Container, styled, Typography } from '@mui/material';

export default function ProductCategories() {
  // 임시데이터
  const images = [
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {images.map((value, index) => (
        <CategoryButton key={index}>
          <img className='categoryImage' src={value.url} width={10} />
          <Typography sx={{ m: 1, textAlign: 'center' }}>{value.title}</Typography>
        </CategoryButton>
      ))}
    </Box >
  )
}

const CategoryButton = styled(Button)(() => ({
  margin: 1,
  width: '23%',
  color: '#0F0F0F',
  display: 'flex',
  flexDirection: 'column',
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.04)'
  }
}))