import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProductCategoryTrue } from '../../app/reducers/categorySlice';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import ProductCategories from '../products/productCategories';
import ProductInfo from './productInfo';
import Files from './files';
import Specification from './specification';
import { getProductDetail } from '../../app/reducers/productSlice';
import { getProductContent } from '../../app/reducers/productFormSlice';
import { productApi } from '../../network/product';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productList = useAppSelector(state => state.product.productList); // 제품 목록

  useEffect(() => {
    dispatch(selectProductCategoryTrue());
  }, []);

  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    productApi.getProduct(productId)
      .then(res => {
        dispatch(getProductDetail({ detail: res }));
        dispatch(getProductContent({ detail: res }));
        navigate('/product-detail');
      })
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 카테고리 */}
      <Box sx={{ flex: 0.3 }}>
        <Box sx={{
          ml: '50%',
          pt: 1,
          pb: 1,
          mt: 5,
          borderLeft: '4px solid rgb(46, 125, 50)',
          minWidth: '130px'
        }}>
          <Container sx={{ display: 'flex' }}>
            <Typography
              variant='h5'
              sx={{
                p: 1,
                userSelect: 'none'
              }}>
              제품 목록
            </Typography>
          </Container>
          <Box sx={{
            pt: 1,
            pb: 1,
            pl: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>

            {productList.map((item: {
              id: number,
              image: {
                id: number,
                originalFilename: string,
                savedPath: string,
                serverFilename: string,
              },
              productName: string
            }) => (
              <MenuButton
                key={item.id}
                onClick={() => getProduct(item.id)}>
                <Typography sx={{ m: 1, textAlign: 'center' }}>{item.productName}</Typography>
              </MenuButton>
            ))}
          </Box >
        </Box>
      </Box>

      {/* 제품 정보 */}
      <Box sx={{ flex: 0.7, pt: 5, mr: '10%', textAlign: 'center' }}>
        <ProductInfo />

        <Spacing />

        {/* 다운로드 자료 */}
        <Files />

        <Spacing />

        {/* 상세 정보 */}
        <Specification />
      </Box>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;

// 제품 목록 버튼
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
