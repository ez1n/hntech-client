import React from 'react';
import { Box, ButtonBase, Container, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Representation() {
  const navigate = useNavigate();

  // 임시 데이터 -> 서버에서 받아오나? 수정해야하니까 그럴듯
  const images = [
    {
      url: '/images/mainButtons/유리벌브.jpg',
      title: '유리벌브',
      width: '31.7%',
      mode: '유리벌브'
    },
    {
      url: '/images/mainButtons/헤드-퓨지블링크조기.jpg',
      title: '헤드 퓨지블링크 조기',
      width: '31.7%',
      mode: '헤드 퓨지블링크 조기'
    },
    {
      url: '/images/mainButtons/건식퓨지블링크.jpg',
      title: '건식 퓨지블링크',
      width: '31.7%',
      mode: '건식 퓨지블링크'
    },
    {
      url: '/images/mainButtons/알람밸브단품.jpg',
      title: '알람밸브 기본형',
      width: '31.7%',
      mode: '알람밸브 기본형'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '알람밸브 버터부착형',
      width: '31.7%',
      mode: '알람밸브 버터부착형'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '알람밸브 버터부착형',
      width: '31.7%',
      mode: '알람밸브 버터부착형'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '알람밸브 버터부착형',
      width: '31.7%',
      mode: '알람밸브 버터부착형'
    }, {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '알람밸브 버터부착형',
      width: '31.7%',
      mode: '알람밸브 버터부착형'
    },
  ];

  // 제품 버튼 클릭 이벤트 (페이지 이동)
  const onClickButton = (mode: string) => {
    console.log(mode); // state 업데이트
    navigate('#'); // 페이지 이동
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{
        p: 2,
        width: '85%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <Container sx={{ width: '33%', m: 0, textAlign: 'start', userSelect: 'none' }}>
          <Typography sx={{ fontSize: 25 }}>우리는</Typography>
          <Typography sx={{ fontSize: 25 }}>이런 제품을 제작합니다.</Typography>
        </Container>

        {/* 제품 버튼 */}
        {images.map((image) => (
          <RepProductionButton
            onClick={() => {
              onClickButton(image.mode);
              navigate('/product');
            }}
            key={image.title}
            style={{
              width: '33%',
              height: 200
            }}
          >
            {/* 버튼 이미지 */}
            <Container
              style={{ backgroundImage: `url(${image.url})` }}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
            <ImageBackdrop className='MuiImageBackdrop-root' />

            {/* 제품 이름 */}
            <Container sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FCFCFC'
            }}>
              <Typography sx={{ position: 'relative', p: 2, fontSize: 18, fontWeight: 'bold', display: 'none' }}>
                {image.title}
              </Typography>
            </Container>
          </RepProductionButton>
        ))}
      </Box>
    </Container >
  )
};

// 메인 버튼
const RepProductionButton = styled(ButtonBase)(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('md')]: {
    width: '50% !important',
    height: 100
  },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100
  },
  '&:hover': {
    '& .MuiImageBackdrop-root': {
      opacity: 0.3
    },
    '& .MuiTypography-root': {
      border: '5px solid #FCFCFC',
      borderRadius: 10,
      display: 'block'
    },
  },
})) as typeof ButtonBase;

// 이미지 커버(배경)
const ImageBackdrop = styled(Container)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#0F0F0F',
  opacity: 0,
  borderRadius: 10,
  transition: theme.transitions.create('opacity')
})) as typeof Container;