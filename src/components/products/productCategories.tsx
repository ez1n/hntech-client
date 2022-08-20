import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCategoryTrue, setCurrentCategory } from '../../app/reducers/productCategorySlice';
import { clickProductCategoryGoBack } from '../../app/reducers/dialogSlice';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelModal from '../cancelModal';

export default function ProductCategories() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const categorySelected = useAppSelector(state => state.productCategory.selected); // 카테고리 선택 state
  const categories = useAppSelector(state => state.productCategory.categories); // 카테고리 목록 state
  const currentCategory = useAppSelector(state => state.productCategory.currentCategory); // 선택된 카테고리 정보 state
  const productCategoryState = useAppSelector(state => state.dialog.productCategoryState); // 카테고리 삭제 dialog

  // 카테고리 삭제
  const deleteCategory = (categoryId: number) => {
    // api.deleteCategory(categoryId)
    //   .then(res => {
    //     dispatch(clickProductCategoryGoBack());
    //   });
    console.log(categoryId)
    dispatch(clickProductCategoryGoBack());
  };

  return (
    <>
      {/* default */}
      {!categorySelected &&
        <>
          <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 5
          }}>
            <Typography
              variant='h5'
              sx={{
                p: 1,
                width: 'max-content',
                borderBottom: '3px solid #2E7D32',
                userSelect: 'none'
              }}>
              제품 소개
            </Typography>
          </Container>


          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {categories.map((value, index) => (
              <ContainerBox key={value.id} sx={{ m: 1 }}>
                <CategoryButton onClick={() => { dispatch(selectCategoryTrue()) }}>
                  {/* 목록 버튼 */}
                  <img className='categoryImage' src={value.imageServerFilename} alt='카테고리 이미지' />
                  <Typography sx={{
                    width: '100%',
                    pt: 1,
                    pb: 1,
                    borderRadius: 1,
                    backgroundColor: 'rgba(57, 150, 82, 0.2)'
                  }}>
                    {value.categoryName}
                  </Typography>
                </CategoryButton>

                {/* 수정 버튼 */}
                {managerMode &&
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button
                      onClick={() => {
                        dispatch(setCurrentCategory({ category: value }));
                        dispatch(clickProductCategoryGoBack());
                      }}
                      sx={{ color: 'red' }}>
                      <RemoveCircleRoundedIcon sx={{ fontSize: 30 }} />
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(setCurrentCategory({ category: value }));
                        navigate('/productCategory-modify');
                      }}
                      sx={{ color: 'darkgreen' }}>
                      <CreateRoundedIcon sx={{ fontSize: 30 }} />
                    </Button>
                  </Box>
                }
              </ContainerBox>
            ))}

            {/* 추가 버튼 */}
            {managerMode &&
              <AddButton onClick={() => navigate('/productCategory-form')}>
                <AddRoundedIcon sx={{ color: '#042709', fontSize: 100, opacity: 0.6 }} />
              </AddButton>
            }
          </Box>
        </>
      }

      {/* category selected */}
      {categorySelected &&
        <>
          <Container sx={{ display: 'flex' }}>
            <Typography
              variant='h5'
              sx={{
                p: 1,
                userSelect: 'none'
              }}>
              제품 소개
            </Typography>
          </Container>
          <Box sx={{
            pt: 1,
            pb: 1,
            pl: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>

            {categories.map((value, index) => (
              <MenuButton key={index} onClick={() => {
                navigate('/product');
                dispatch(selectCategoryTrue());
              }}>
                <Typography sx={{ m: 1, textAlign: 'center' }}>{value.categoryName}</Typography>
              </MenuButton>
            ))}
          </Box >
        </>
      }

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={productCategoryState}
        title='카테고리 삭제'
        text1='해당 카테고리가 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => deleteCategory(currentCategory.id)}
        closeAction={() => dispatch(clickProductCategoryGoBack())} />
    </>
  )
};

const ContainerBox = styled(Box)(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('lg')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90% !important'
  },
  width: '23%',
  margin: 1
})) as typeof Box;

// Image 버튼
const CategoryButton = styled(Button)(() => ({
  width: '100%',
  color: '#0F0F0F',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(57, 150, 82, 0.2)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.04)'
  }
})) as typeof Button;

// 추가 버튼
const AddButton = styled(Button)(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('lg')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90% !important'
  },
  margin: 10,
  width: '23%',
  color: '#0F0F0F',
  backgroundColor: 'rgba(57, 150, 82, 0.1)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  }
})) as typeof Button;

// Text 버튼
const MenuButton = styled(Button)(() => ({
  color: '#0F0F0F',
  fontSize: 15,
  marginBottom: 2,
  justifyContent: 'flex-start',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.1)',
    transform: 'scale(1.02)'
  }
})) as typeof Button;
