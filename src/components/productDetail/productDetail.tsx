import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {productApi} from '../../network/product';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductDetail, getProductList} from '../../app/reducers/productSlice';
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
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');
  const middleCategory = new URLSearchParams(location.search).get('middle');
  const id = new URLSearchParams(location.search).get('id');

  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const productId = useAppSelector(state => state.product.productDetail.id);
  const productName = useAppSelector(state => state.product.productDetail.productName); // 제품 이름
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state

  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    navigate(`/product?main=${currentProductCategoryName}&middle=${middleCategory}&id=${productId}`);
  };

  useEffect(() => {
    (mainCategory && middleCategory) &&
    productApi.getAllProducts(mainCategory)
      .then(res => dispatch(getProductList({productList: res})))
      .catch(error => console.log(error))

    dispatch(resetProductForm());
  }, []);

  useEffect(() => {
    id &&
    productApi.getProduct(parseInt(id))
      .then(res => {
        dispatch(getProductDetail({detail: res}));
        dispatch(getProductContent({detail: res}));
      })
  }, [id]);

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
            width: 'max-content'
          }}>

            <MenuButton
              onClick={() => navigate(`/product/category?main=${mainCategory}&middle=${middleCategory}`)}
              sx={{
                color: '#0F0F0F',
                backgroundColor: 'rgba(166,166,166,0.25)',
                '&:hover': {
                  backgroundColor: 'rgba(166,166,166,0.25)'
                }
              }}>
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
                  color: item.productName === productName ? '#F0F0F0' : '#0F0F0F',
                  backgroundColor: item.productName === productName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
                  '&:hover': {
                    backgroundColor: item.productName === productName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
                  }
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
      <Box sx={{flex: 0.8, pt: 5, textAlign: 'center'}}>
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
  padding: 10,
  paddingLeft: 10,
  paddingRight: 20,
  marginLeft: 10,
  fontSize: 15,
  fontWeight: 'bold',
  marginBottom: 10,
  borderRadius: 5,
  justifyContent: 'flex-start',
  transition: '0.5s',
  '&:hover': {
    transform: 'scale(1.02)'
  }
})) as typeof Button;

const CategoryTotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  flex: 0.2
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