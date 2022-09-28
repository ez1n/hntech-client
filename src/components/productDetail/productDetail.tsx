import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {productApi} from '../../network/product';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectProductCategoryTrue} from '../../app/reducers/categorySlice';
import {getProductDetail} from '../../app/reducers/productSlice';
import {getProductContent, resetProductForm} from '../../app/reducers/productFormSlice';
import {Box, Button, Container, MenuItem, Select, styled, Typography} from '@mui/material';
import ProductInfo from './productInfo';
import Files from './files';
import Specification from './specification';

interface propsType {
  successDelete: () => void
}

export default function ProductDetail({successDelete}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const productId = useAppSelector(state => state.product.productDetail.id);
  const productName = useAppSelector(state => state.product.productDetail.productName); // 제품 이름

  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    productApi.getProduct(productId)
      .then(res => {
        dispatch(getProductDetail({detail: res}));
        dispatch(getProductContent({detail: res}));
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
          <Container sx={{display: 'flex'}}>
            <Typography variant='h5' sx={{p: 1, userSelect: 'none', fontWeight: 'bold'}}>
              제품 목록
            </Typography>
          </Container>
          <Box sx={{
            pt: 1,
            pb: 1,
            pl: 2,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 'max-content'
          }}>

            <MenuButton onClick={() => navigate('/client-product')}>
              전체
            </MenuButton>
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
                onClick={() => getProduct(item.id)}
                sx={{
                  color: item.productName === productName ? 'darkgreen' : '#0F0F0F',
                  fontSize: item.productName === productName ? 'x-large' : 'middle'
                }}>
                {item.productName}
              </MenuButton>
            ))}
          </Box>
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
      <Box sx={{flex: 0.7, pt: 5, textAlign: 'center'}}>
        <ProductInfo successDelete={successDelete}/>

        <Spacing/>

        {/* 다운로드 자료 */}
        <Files/>

        <Spacing/>

        {/* 상세 정보 */}
        <Specification/>
      </Box>
    </TotalBox>
  )
};

const Spacing = styled(Container)(({theme}) => ({
  height: 50
})) as typeof Container;

// 제품 목록 버튼
const MenuButton = styled(Button)(() => ({
  margin: 10,
  textAlign: 'start',
  fontWeight: 'bold',
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

const CategoryTotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  flex: 0.3
})) as typeof Box;

const CategoryBox = styled(Box)(({theme}) => ({
  paddingTop: 10,
  paddingBottom: 10,
  marginTop: 20,
  borderLeft: '4px solid rgb(46, 125, 50)',
  minWidth: '130px'
})) as typeof Box;

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  },
  display: 'flex',
  width: '80vw',
  margin: 'auto',
  marginTop: 50
})) as typeof Box;

const SelectBox = styled(Box)(({theme}) => ({
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