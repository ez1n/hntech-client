import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, styled, Typography } from '@mui/material';

SwiperCore.use([Navigation, Pagination, Autoplay])

export default function Banner() {
  //임시데이터
  const bannerImage = [
    { url: '/images/banner/banner1.jpg' },
    { url: '/images/banner/banner2.jpg' },
    { url: '/images/banner/banner3.jpg' },
  ];

  return (
    // 배너 삽입 (배경, 멘트)
    <TotalBox>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {bannerImage.map((item: { url: string }, index: number) => (
          <SwiperSlide key={index}>
            <BannerBox sx={{ width: '100%' }}>
              <Box sx={{ position: 'absolute', bottom: '10%', left: '8%' }}>
                <MainTypography>인간과 기술을 존중하여</MainTypography>
                <MainTypography>미래를 연결하는 기업</MainTypography>
              </Box>
              <img src={item.url} width={'100%'} />
            </BannerBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </TotalBox>
  )
};
const TotalBox = styled(Box)(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('lg')]: {
    width: '100% !important',
    height: '50% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: '50% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: '50% !important'
  },
  height: '50%'
})) as typeof Box;

const BannerBox = styled(Box)(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('lg')]: {
    height: '100% !important'
  },
  [theme.breakpoints.down('md')]: {
    height: '100% !important'
  },
  [theme.breakpoints.down('sm')]: {
    height: '100% !important'
  },
  height: '100%'
})) as typeof Box;

const MainTypography = styled(Typography)(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('lg')]: {
    fontSize: '30px !important'
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '25px !important'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px !important'
  },
  fontSize: 40,
  color: '#FCFCFC'
})) as typeof Typography;