import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCategoryTrue } from '../../app/reducers/productSlice';
import { clickGoBack } from '../../app/reducers/dialogSlice';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function ProductCategories() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const categorySelected = useAppSelector(state => state.category.selected); // 카테고리 선택 state
  const cancel = useAppSelector(state => state.dialog.cancel); // 카테고리 삭제 dialog

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
              <ContainerBox sx={{ width: '23%', m: 1 }}>
                <CategoryButton key={index} onClick={() => { dispatch(selectCategoryTrue()) }}>
                  {/* 목록 버튼 */}
                  <img className='categoryImage' src={value.url} alt='카테고리 이미지' />
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

                {/* 수정 버튼 */}
                {managerMode &&
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={() => dispatch(clickGoBack())} sx={{ color: 'red' }}>
                      <RemoveCircleRoundedIcon sx={{ fontSize: 30 }} />
                    </Button>
                    <Button sx={{ color: 'darkgreen' }}>
                      <CreateRoundedIcon sx={{ fontSize: 30 }} />
                    </Button>
                  </Box>
                }
              </ContainerBox>
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

      {/* 삭제 버튼 Dialog */}
      <Dialog
        open={cancel}
        onClose={() => dispatch(clickGoBack())}>
        <DialogTitle>
          카테고리 삭제
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 카테고리가 삭제됩니다.
          </DialogContentText>
          <DialogContentText>
            삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            dispatch(clickGoBack());
            navigate('/product');
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
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
}));

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
    transform: 'scale(1.04)',
    fontWeight: 'bold'
  }
})) as typeof Button;

// 추가 버튼
const AddButton = styled(Button)(() => ({
  margin: 10,
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
    transform: 'scale(1.02)',
    fontWeight: 'bold'
  }
})) as typeof Button;