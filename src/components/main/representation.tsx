import React, { useEffect } from 'react';
import { categoryApi } from '../../network/category';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setMainCategories } from '../../app/reducers/categorySlice';
import {
  Box,
  ButtonBase,
  Container,
  Typography,
  styled
} from '@mui/material';

export default function Representation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const mainCategories = useAppSelector(state => state.productCategory.mainCategories); // 메인 카테고리 목록

  const mainCategories = [
    {
      categoryName: '유리벌브',
      id: 0,
      imageServerFilename: '/images/mainButtons/유리벌브.jpg',
      sequence: 0,
    },
    {
      categoryName: '유리벌브',
      id: 0,
      imageServerFilename: '/images/mainButtons/유리벌브.jpg',
      sequence: 0,
    },
    {
      categoryName: '유리벌브',
      id: 0,
      imageServerFilename: '/images/mainButtons/유리벌브.jpg',
      sequence: 0,
    }]

  // 메인 카테고리 받아오기
  // useEffect(() => {
  //   categoryApi.getMainCategories()
  //     .then(res => {
  //       dispatch(setMainCategories({ categories: res.categories }));
  //       console.log(res);
  //     })
  //     .catch(error => console.warn(error))
  // }, [])

  // 카테고리 이미지 받아오기


  // 제품 버튼 클릭 이벤트 (페이지 이동)
  const onClickButton = (mode: string) => {
    console.log(mode); // state 업데이트
    navigate('#'); // 페이지 이동
  };

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
        {mainCategories.map((item: { categoryName: string, id: number, imageServerFilename: string, sequence: number }) => (
          <RepProductionButton
            onClick={() => {
              onClickButton(item.categoryName);
              navigate('/product');
            }}
            key={item.id}
            style={{
              width: '33%',
              height: 200
            }}
          >
            {/* 버튼 이미지 */}
            <Container
              style={{ backgroundImage: `url(${item.imageServerFilename})` }}
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
              <Typography
                sx={{
                  p: 2,
                  position: 'relative',
                  fontSize: 18,
                  fontWeight: 'bold',
                  display: 'none'
                }}>
                {item.categoryName}
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