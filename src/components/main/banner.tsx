import React from 'react';
import {api} from '../../network/network';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, Navigation, Pagination, Autoplay} from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {useAppSelector} from '../../app/hooks';
import {Box, styled} from '@mui/material';

export default function Banner() {
  const banner = useAppSelector(state => state.manager.banner); // 배너 정보 state

  return (
    <TotalBox>
      <Swiper
        effect="fade"
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{clickable: true}}
        autoplay={{delay: 5500}}>
        {banner?.map((item: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }, index: number) => (
          <SwiperSlide key={index}>
            <BannerBox sx={{width: '100%', height: '80vh '}}>
              <img src={`${api.baseUrl()}/files/admin/${item.serverFilename}`} width={'100%'} height={'100%'}/>
            </BannerBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </TotalBox>
  )
};
const TotalBox = styled(Box)(({theme}) => ({
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

const BannerBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('xl')]: {
    height: '80% !important'
  },
  height: '80%'
})) as typeof Box;