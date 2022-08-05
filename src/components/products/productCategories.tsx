import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCategoryTrue } from '../../app/reducers/productSlice';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function ProductCategories() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const categorySelected = useAppSelector(state => state.category.selected); // 카테고리 선택 state

  // 임시데이터
  const images = [
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/건식퓨지블링크.jpg',
      title: '건식퓨지블링크'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    },
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '유리벌브'
    }
  ];

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


          <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: '10%', mr: '10%' }}>
            {images.map((value, index) => (
              <CategoryButton key={index} onClick={() => { dispatch(selectCategoryTrue()) }}>

                {/* 수정 버튼 */}
                {managerMode &&
                  <>
                    <DeleteButton>
                      <RemoveCircleRoundedIcon sx={{ fontSize: 35 }} />
                    </DeleteButton>
                    <EditButton>
                      <CreateRoundedIcon sx={{ fontSize: 35 }} />
                    </EditButton>
                  </>
                }

                {/* 목록 버튼 */}
                <img className='categoryImage' src={value.url} width={10} alt='카테고리 이미지' />
                <Typography sx={{
                  width: '100%',
                  pt: 1,
                  pb: 1,
                  borderRadius: 1,
                  backgroundColor: 'rgba(57, 150, 82, 0.2)'
                }}>
                  {value.title}
                </Typography>

              </CategoryButton>
            ))}

            {managerMode &&
              <AddButton>
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

            {images.map((value, index) => (
              <MenuButton key={index} onClick={() => {
                navigate('/product');
                dispatch(selectCategoryTrue());
              }}>
                <Typography sx={{ m: 1, textAlign: 'center' }}>{value.title}</Typography>
              </MenuButton>
            ))}
          </Box >
        </>
      }
    </>
  )
};

// Image 버튼
const CategoryButton = styled(Button)(({ theme }) => ({
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
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(57, 150, 82, 0.2)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.04)',
    fontWeight: 'bold'
  }
}));

// 삭제 버튼
const DeleteButton = styled(Button)(() => ({
  color: 'red',
  position: 'absolute',
  top: 5,
  right: 0,
}));

// 편집 버튼
const EditButton = styled(Button)(() => ({
  color: 'green',
  position: 'absolute',
  top: 5,
  right: 50,
}));

// 추가 버튼
const AddButton = styled(Button)(({ theme }) => ({
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
}));

// Text 버튼
const MenuButton = styled(Button)(() => ({
  color: '#0F0F0F',
  fontSize: 15,
  marginBottom: 2,
  justifyContent: 'flex-start',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.1)',
    transform: 'scale(1.02)',
    fontWeight: 'bold'
  }
}));