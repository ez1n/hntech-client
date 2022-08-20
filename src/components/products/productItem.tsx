import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickProductItemGoBack } from '../../app/reducers/dialogSlice';
import { getProductList } from '../../app/reducers/productSlice';
import { Box, Button, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelModal from '../cancelModal';

export default function ProductItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productItemState = useAppSelector(state => state.dialog.productItemState); // 제품 삭제 dialog
  const productList = useAppSelector(state => state.product.productList); // 제품 목록

  // 임시데이터
  const items = [
    {
      url: '/images/mainButtons/알람밸브조립.jpg',
      title: '스프링클러'
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
      title: '알람밸브'
    }
  ];

  useEffect(() => {
    dispatch(getProductList({ productList: items }));
  }, []);

  // 제품 삭제
  const deleteProduct = () => {
    // 삭제 요청
    dispatch(clickProductItemGoBack());
  };

  // 수정 요청
  const modifyProduct = () => {
    navigate('/product-modify');
    // 뭐 보내야 정보 받아올거아냐
  };

  return (
    <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
      {productList.map((item, index) => (
        <TotalBox key={index}>
          <ContainerBox>
            <ProductButton onClick={() => navigate('/product-detail')}>
              <img className='productImage' src={item.url} width='100%' alt='제품 이미지' />
              <Typography sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: 'rgba(57, 150, 82, 0.2)'
              }}>
                {item.title}
              </Typography>
            </ProductButton>

            {/* 수정 버튼 */}
            {managerMode &&
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => dispatch(clickProductItemGoBack())}
                  sx={{ color: 'red', padding: 0 }}>
                  <RemoveCircleRoundedIcon sx={{ fontSize: 25 }} />
                </Button>
                <Button
                  onClick={modifyProduct}
                  sx={{ color: 'green', padding: 0 }}>
                  <CreateRoundedIcon sx={{ fontSize: 25 }} />
                </Button>
              </Box>
            }
          </ContainerBox>
        </TotalBox>
      ))
      }

      {
        managerMode &&
        <AddButton onClick={() => navigate('/product-form')}>
          <AddRoundedIcon sx={{ color: '#042709', fontSize: 100, opacity: 0.6 }} />
        </AddButton>
      }
      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={productItemState}
        title='제품 삭제'
        text1='해당 제품이 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => deleteProduct()}
        closeAction={() => dispatch(clickProductItemGoBack())} />
    </Box >
  )
};

const TotalBox = styled(Box)(({ theme }) => ({
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
  width: '19%',
  margin: 3,
})) as typeof Box;

const ContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})) as typeof Box;

// Item 버튼
const ProductButton = styled(Button)(() => ({
  margin: 10,
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
  width: '18%',
  color: '#0F0F0F',
  backgroundColor: 'rgba(57, 150, 82, 0.1)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  }
})) as typeof Button;