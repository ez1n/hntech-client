import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProductCategoryTrue } from '../../app/reducers/categorySlice';
import { Box, Button, Container, MenuItem, Select, styled, Typography } from '@mui/material';
import ProductInfo from './productInfo';
import Files from './files';
import Specification from './specification';
import { getProductDetail } from '../../app/reducers/productSlice';
import { getProductContent, resetProductForm } from '../../app/reducers/productFormSlice';
import { productApi } from '../../network/product';
import { useNavigate } from 'react-router-dom';

interface propsType {
  successDelete: () => void
}

export default function ProductDetail({ successDelete }: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const productId = useAppSelector(state => state.product.productDetail.id);

  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    productApi.getProduct(productId)
      .then(res => {
        dispatch(getProductDetail({ detail: res }));
        dispatch(getProductContent({ detail: res }));
      })
  };

  useEffect(() => {
    getProduct(productId)
    dispatch(selectProductCategoryTrue());
    dispatch(resetProductForm());
  }, []);

  return (
    <TotalBox>
      {/* 제품목록 */}
      <CategoryTotalBox>
        <CategoryBox>
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
        </CategoryBox>
      </CategoryTotalBox>

      {/* 900px 이하 사이드 메뉴 */}
      <SelectBox>
        <MenuSelect
          defaultValue={productId}
          onChange={(event: any) => getProduct(event?.target.value)}
          size='small'>
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
            <MenuList key={item.id} value={item.id}>{item.productName}</MenuList>
          ))}
        </MenuSelect>
      </SelectBox>

      {/* 제품 정보 */}
      <Box sx={{ flex: 0.8, pt: 5, textAlign: 'center' }}>
        <ProductInfo successDelete={successDelete} />

        <Spacing />

        {/* 다운로드 자료 */}
        <Files />

        <Spacing />

        {/* 상세 정보 */}
        <Specification />
      </Box>
    </TotalBox>
  )
};

const Spacing = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 30
  },
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

const CategoryTotalBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  flex: 0.2,
  paddingTop: 20
})) as typeof Box;

const CategoryBox = styled(Box)(({ theme }) => ({
  paddingTop: 10,
  paddingBottom: 10,
  marginTop: 20,
  borderLeft: '4px solid rgb(46, 125, 50)',
  minWidth: '130px'
})) as typeof Box;

const TotalBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  },
  display: 'flex',
  width: '80vw',
  margin: 'auto'
})) as typeof Box;

const SelectBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block'
  },
  display: 'none',
}));

const MenuSelect = styled(Select)(() => ({
  textAlign: 'center',
  marginTop: 20,
  width: '100%'
}));

const MenuList = styled(MenuItem)(() => ({
  justifyContent: 'center'
})) as typeof MenuItem;