import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {productApi} from '../../network/product';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductDetail, getProductList} from '../../app/reducers/productSlice';
import {Box, Breadcrumbs, Button, Container, MenuItem, Select, styled, Typography} from '@mui/material';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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
  const searchParams = new URLSearchParams(location.search)
  const mainCategory = searchParams.get('main');
  const middleCategory = searchParams.get('middle');
  const productId = searchParams.get('id');
  const id = productId && parseInt(productId);

  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const productName = useAppSelector(state => state.product.productDetail.productName); // 제품 이름
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state

  // 제품 페이지 이동
  const getProduct = (productId: number) => {
    navigate(`/product?main=${currentProductCategoryName}&middle=${middleCategory}&id=${productId}`);
  };

  useEffect(() => {
    middleCategory &&
    productApi.getAllProducts(middleCategory)
      .then(res => dispatch(getProductList({productList: res})))
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    id &&
    productApi.getProduct(id)
      .then(res => dispatch(getProductDetail({detail: res})))
      .catch(error => console.log(error))
  }, [id]);

  return (
    <>
      <BreadcrumbsBox>
        <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
          <BreadcrumbsTypography onClick={() => navigate('/product/category')}>
            전체 카테고리
          </BreadcrumbsTypography>
          <BreadcrumbsTypography onClick={() => navigate(`/product/category?main=${mainCategory}`)}>
            {mainCategory}
          </BreadcrumbsTypography>
          <BreadcrumbsTypography
            onClick={() => navigate(`/product/category?main=${mainCategory}&middle=${middleCategory}`)}>
            {middleCategory}
          </BreadcrumbsTypography>
          <BreadcrumbsCurrentTypography>
            {productName}
          </BreadcrumbsCurrentTypography>
        </Breadcrumbs>
      </BreadcrumbsBox>

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
          <Select
            value={id}
            onChange={(event: any) => getProduct(event?.target.value)}
            size='small'
            sx={{textAlign: 'center', width: '100%'}}
          >
            <MenuItem disabled value='33' sx={{display: "none"}}> </MenuItem>
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
              <MenuItem key={item.id} value={item.id} sx={{justifyContent: 'center'}}>{item.productName}</MenuItem>
            ))}
          </Select>
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
    </>
  )
};

const Spacing = styled(Container)(() => ({
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

const CategoryBox = styled(Box)(() => ({
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

const BreadcrumbsBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  margin: 'auto',
  marginTop: 50,
  width: '80vw'
})) as typeof Box;

const BreadcrumbsTypography = styled(Typography)(() => ({
  fontSize: 'medium',
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: '5px',
  backgroundColor: 'rgba(166,166,166,0.25)',
  padding: 5,
  '&:hover': {fontWeight: 'bold', textDecoration: 'underline'}
})) as typeof Typography;

const BreadcrumbsCurrentTypography = styled(Typography)(() => ({
  fontSize: 'medium',
  fontWeight: 'bold',
  userSelect: 'none',
  borderRadius: '5px',
  backgroundColor: 'rgba(79,79,79,0.78)',
  color: '#F0F0F0',
  padding: 5,
})) as typeof Typography;