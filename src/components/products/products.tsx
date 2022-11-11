import React, {useCallback, useEffect, useState} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useLocation, useNavigate} from 'react-router-dom';
import {productApi} from '../../network/product';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductList} from '../../app/reducers/productSlice';
import {clickProductItemGoBack} from '../../app/reducers/dialogSlice';
import {changeMode} from '../../app/reducers/adminSlice';
import {setCurrentProductCategoryName, setCurrentProductMiddleCategoryName} from '../../app/reducers/categorySlice';
import {Box, Button, styled, Select, MenuItem, Typography, Grid, Breadcrumbs} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProductMainCategory from './productMainCategory';
import CancelModal from '../cancelModal';
import ProductItem from './productItem';
import ProductMiddleCategory from "./productMiddleCategory";
import ProductCategorySelect from "../productCategorySelect";

interface propsType {
  successDelete: () => void
}

export default function Products({successDelete}: propsType) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');
  const middleCategory = new URLSearchParams(location.search).get('middle');

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productCategories = useAppSelector(state => state.category.productCategories); // 대분류 카테고리 목록 state
  const productMiddleCategories = useAppSelector(state => state.category.productMiddleCategories); // 중분류 카테고리 목록 state
  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state
  const currentProductMiddleCategoryName = useAppSelector(state => state.category.currentProductMiddleCategoryName); // 현재 선택된 중분류 카테고리 state
  const productItemState = useAppSelector(state => state.dialog.productItemState); // 제품 삭제 dialog
  const currentProductData = useAppSelector(state => state.product.currentProductData); // 선택된 제품 정보
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  window.addEventListener("resize", handleWindowResize);

  //제품 목록 받아오기
  useEffect(() => {
    middleCategory &&
    productApi.getAllProducts(middleCategory)
      .then(res => dispatch(getProductList({productList: res})))
      .catch(error => console.log(error))
  }, [middleCategory]);

  // 대분류 카테고리 선택
  const getMainCategory = (categoryName: string) => {
    dispatch(setCurrentProductCategoryName({category: categoryName}));
    navigate(`/product/category?main=${categoryName}`);
  };

  // 중분류 카테고리 선택
  const getMiddleCategory = (categoryName: string) => {
    dispatch(setCurrentProductMiddleCategoryName({category: categoryName}));
    navigate(`/product/category?main=${mainCategory}&middle=${categoryName}`);
  };

  // 제품 삭제
  const deleteProduct = (productId: number) => {
    productApi.deleteProduct(productId)
      .then(() => {
        middleCategory &&
        productApi.getAllProducts(middleCategory)
          .then(res => {
            successDelete();
            dispatch(getProductList({productList: res}));
            dispatch(clickProductItemGoBack());
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  function ProductGrid() {
    let productColumn = 4;
    if (windowSize < 1200) productColumn = 3;
    if (windowSize < 900) productColumn = 2;
    if (windowSize < 600) productColumn = 1;

    return (
      <DndProvider backend={HTML5Backend}>
        <Grid container columns={productColumn} spacing={1}>
          {productList.length !== 0 ? // 제품 존재하는 경우
            productList.map((item: {
              id: number,
              image: {
                id: number,
                originalFilename: string,
                savedPath: string,
                serverFilename: string
              },
              productName: string
            }) => (
              <Grid key={item.id} item xs={1}>
                <ProductItem product={item} index={item.id}/>
              </Grid>
            )) : // 제품 존재하지 않는 경우
            <Typography>
              해당 카테고리에 제품이 존재하지 않습니다.
            </Typography>}
        </Grid>
      </DndProvider>
    )
  }

  if (!mainCategory) {
    return (
      <>
        <BreadcrumbsBox>
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
            {[
              <Typography sx={{
                fontSize: 'large',
                userSelect: 'none',
                borderRadius: '5px',
                bgcolor: 'rgba(198,219,227,0.73)',
                p: 1
              }}>전체 카테고리</Typography>
            ]}
          </Breadcrumbs>
        </BreadcrumbsBox>

        <Box sx={{p: 5, m: 'auto', width: '70vw', display: 'flex', justifyContent: 'center'}}>
          <ProductMainCategory windowSize={windowSize} successDelete={successDelete}/>
        </Box>
      </>
    )
  } else if (mainCategory && !middleCategory) {
    return (
      <Box>
        <BreadcrumbsBox>
          <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
            {[
              <Typography
                onClick={() => navigate('/product/category')}
                sx={{
                  fontSize: 'large',
                  cursor: 'pointer',
                  userSelect: 'none',
                  borderRadius: '5px',
                  bgcolor: 'rgba(198,219,227,0.73)',
                  p: 1,
                  '&:hover': {fontWeight: 'bold', textDecoration: 'underline'}
                }}>
                전체 카테고리
              </Typography>,
              <Typography sx={{
                fontSize: 'large',
                fontWeight: 'bold',
                userSelect: 'none',
                borderRadius: '5px',
                bgcolor: 'rgba(198,219,227,0.73)',
                p: 1
              }}>
                {mainCategory}
              </Typography>,
            ]}
          </Breadcrumbs>
        </BreadcrumbsBox>

        <TotalBox>
          {/* 사이드 메뉴 */}
          <Box sx={{flex: 0.2}}>
            <CategoryBox>
              <ProductMainCategory
                windowSize={windowSize}
                successDelete={successDelete}/>
            </CategoryBox>
          </Box>

          {/* 900px 이하 사이드 메뉴 */}
          <SelectBox>
            <Select
              sx={{textAlign: 'center', width: '100%'}}
              defaultValue={mainCategory ? mainCategory : currentProductCategoryName}
              onChange={event => getMainCategory(event?.target.value)}
              size='small'>
              {productCategories.map((item: {
                categoryName: string;
                id: number;
                imageServerFilename: string;
                imageOriginalFilename: string;
                showInMain: string;
              }) => (
                <MenuList key={item.id} value={item.categoryName}>{item.categoryName}</MenuList>
              ))}
            </Select>
          </SelectBox>

          {/* 중분류 카테고리 */}
          <Box sx={{flex: 0.8, pt: 5}}>
            <ProductMiddleCategory windowSize={windowSize} successDelete={successDelete}/>
            {/* 추가 버튼 */}
            {managerMode &&
              <AddButton onClick={() => navigate('/product/category/middle/form')}>
                <AddRoundedIcon sx={{color: '#042709', fontSize: 100, opacity: 0.6}}/>
              </AddButton>
            }
          </Box>
        </TotalBox>
      </Box>
    )
  } else {
    return (
      <>
        <Box>
          <BreadcrumbsBox>
            <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
              {[
                <Typography
                  onClick={() => navigate('/product/category')}
                  sx={{
                    fontSize: 'large',
                    cursor: 'pointer',
                    userSelect: 'none',
                    borderRadius: '5px',
                    bgcolor: 'rgba(198,219,227,0.73)',
                    p: 1,
                    '&:hover': {fontWeight: 'bold', textDecoration: 'underline'}
                  }}>
                  전체 카테고리
                </Typography>,
                <Typography
                  onClick={() => navigate(`/product/category?main=${mainCategory}`)}
                  sx={{
                    fontSize: 'large',
                    cursor: 'pointer',
                    userSelect: 'none',
                    borderRadius: '5px',
                    bgcolor: 'rgba(198,219,227,0.73)',
                    p: 1,
                    '&:hover': {fontWeight: 'bold', textDecoration: 'underline'}
                  }}>
                  {mainCategory}
                </Typography>,
                <Typography sx={{
                  fontSize: 'large',
                  fontWeight: 'bold',
                  userSelect: 'none',
                  borderRadius: '5px',
                  bgcolor: 'rgba(198,219,227,0.73)',
                  p: 1
                }}>
                  {middleCategory}
                </Typography>
              ]}
            </Breadcrumbs>
          </BreadcrumbsBox>

          <TotalBox>
            {/* 사이드 메뉴 */}
            <Box sx={{flex: 0.2}}>
              <CategoryBox>
                <ProductMiddleCategory windowSize={windowSize} successDelete={successDelete}/>
              </CategoryBox>
            </Box>

            {/* 900px 이하 메뉴 */}
            <SelectBox>
              <ProductCategorySelect
                category={productMiddleCategories}
                defaultCategory={middleCategory ? middleCategory : currentProductMiddleCategoryName}
                getCategory={getMiddleCategory}/>
            </SelectBox>

            {/* 제품 목록 */}
            <Box sx={{flex: 0.8, pt: 5}}>
              <Box sx={{p: 1, display: 'flex', flexWrap: 'wrap'}}>
                <ProductGrid/>
              </Box>
              {managerMode &&
                <AddButton onClick={() => navigate('/product/form')}>
                  <AddRoundedIcon sx={{color: '#042709', fontSize: 100, opacity: 0.6}}/>
                </AddButton>}
            </Box>
          </TotalBox>
        </Box>

        {/* 삭제 버튼 Dialog */}
        <CancelModal
          openState={productItemState}
          title='제품 삭제'
          text1='해당 제품이 삭제됩니다.'
          text2='삭제하시겠습니까?'
          yesAction={() => deleteProduct(currentProductData.id)}
          closeAction={() => dispatch(clickProductItemGoBack())}/>
      </>
    )
  }
};

// 추가 버튼
const AddButton = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important'
  },
  width: '25%',
  margin: 5,
  color: '#0F0F0F',
  backgroundColor: 'rgba(57, 150, 82, 0.1)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  }
})) as typeof Button;

const SelectBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block',
    marginTop: 50
  },
  display: 'none',
}));

const MenuList = styled(MenuItem)(() => ({
  justifyContent: 'center'
})) as typeof MenuItem;

const CategoryBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  paddingTop: 10,
  paddingBottom: 10,
  marginTop: 20,
  borderLeft: '4px solid rgb(46, 125, 50)',
  minWidth: '130px'
})) as typeof Box;

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    margin: 'auto',
  },
  display: 'flex',
  width: '80vw',
  margin: 'auto',
  marginTop: 50
})) as typeof Box;

const BreadcrumbsBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  margin: 'auto',
  marginTop: 50,
  width: '80vw'
})) as typeof Box;
