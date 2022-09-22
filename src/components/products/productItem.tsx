import React from 'react';
import {api} from '../../network/network';
import {productApi} from '../../network/product';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clickProductItemGoBack} from '../../app/reducers/dialogSlice';
import {getProductContent} from '../../app/reducers/productFormSlice';
import {getCurrentProductData, getProductDetail} from '../../app/reducers/productSlice';
import {Box, Button, styled, Typography} from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

interface propsType {
  product: {
    id: number,
    image: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string
    },
    productName: string
  }
}

export default function ProductItem({product}: propsType) {
  const {id, image, productName} = product;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    productApi.getProduct(productId)
      .then(res => {
        dispatch(getProductDetail({detail: res}));
        dispatch(getProductContent({detail: res}));
        navigate('/product-detail');
      })
  };

  //제품 수정
  const putProduct = () => {
    productApi.getProduct(product.id)
      .then(res => {
        dispatch(getProductDetail({detail: res}));
        dispatch(getProductContent({detail: res}));
        navigate('/product-modify');
      })
  };

  return (
    <TotalBox>
      <ProductBox>
        {/* 제품 */}
        <ProductButton onClick={() => getProduct(id)}>
          <Box sx={{height: 150}}>
            <img
              className='productImage'
              src={`${api.baseUrl()}/files/product/${image.serverFilename}`}
              width='100%'
              height='100%'
              alt={image.originalFilename}/>
          </Box>
          <ProductNameTypography>
            {productName}
          </ProductNameTypography>
        </ProductButton>

        {/* 수정 버튼 */}
        {managerMode &&
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                <Button
                    onClick={() => {
                      dispatch(getCurrentProductData({productData: product}))
                      dispatch(clickProductItemGoBack());
                    }}
                    sx={{color: 'red'}}>
                    <RemoveCircleRoundedIcon sx={{fontSize: 25}}/>
                </Button>
                <Button onClick={putProduct} sx={{color: 'green', padding: 0}}>
                    <CreateRoundedIcon sx={{fontSize: 25}}/>
                </Button>
            </Box>
        }
      </ProductBox>
    </TotalBox>
  )
};

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '50% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important'
  },
  width: '25%'
}))

const ProductBox = styled(Box)(() => ({
  margin: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})) as typeof Box;

// Item 버튼
const ProductButton = styled(Button)(() => ({
  width: '100%',
  height: 200,
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

const ProductNameTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 15
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 13
  },
  width: '100%',
  paddingTop: 4,
  paddingBottom: 4,
  borderRadius: 1,
  backgroundColor: 'rgba(57, 150, 82, 0.2)'
})) as typeof Typography;