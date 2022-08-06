import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Button, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router-dom';

export default function ProductItem() {
  const navigate = useNavigate();
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

  // 임시데이터
  const items = [
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
    <TotalBox>
      {items.map((item, index) => (
        <ProductButton key={index} onClick={() => navigate('/product-detail')}>
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

          <img className='productImage' src={item.url} width='100%' alt='제품 이미지' />
          <Typography sx={{
            width: '100%',
            borderRadius: 1,
            backgroundColor: 'rgba(57, 150, 82, 0.2)'
          }}>
            {item.title}
          </Typography>
        </ProductButton>
      ))}

      {managerMode &&
        <AddButton onClick={() => navigate('/product-form')}>
          <AddRoundedIcon sx={{ color: '#042709', fontSize: 100, opacity: 0.6 }} />
        </AddButton>
      }
    </TotalBox>
  )
};

const TotalBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  },
  padding: 10,
  paddingLeft: 30,
  display: 'flex',
  flexWrap: 'wrap'
}));

// Item 버튼
const ProductButton = styled(Button)(({ theme }) => ({
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
  width: '20%',
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
  width: '20%',
  color: '#0F0F0F',
  backgroundColor: 'rgba(57, 150, 82, 0.1)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  }
}));