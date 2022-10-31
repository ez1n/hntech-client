import React, {useCallback, useEffect, useState} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useNavigate} from 'react-router-dom';
import {productApi} from '../../network/product';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getProductList} from '../../app/reducers/productSlice';
import {resetProductForm} from '../../app/reducers/productFormSlice';
import {clickProductItemGoBack} from '../../app/reducers/dialogSlice';
import {changeMode} from '../../app/reducers/managerModeSlice';
import {selectProductCategoryTrue, setCurrentProductCategoryName} from '../../app/reducers/categorySlice';
import {Box, Button, styled, Select, MenuItem, Typography, Grid, Breadcrumbs, Container} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProductMainCategory from './productMainCategory';
import CancelModal from '../cancelModal';
import ProductItem from './productItem';
import ProductMiddleCategory from "./productMiddleCategory";

interface propsType {
  successDelete: () => void
}

export default function Products({successDelete}: propsType) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productCategorySelected = useAppSelector(state => state.category.productCategorySelected); // 카테고리 선택 state
  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록 state
  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state
  const productItemState = useAppSelector(state => state.dialog.productItemState); // 제품 삭제 dialog
  const currentProductData = useAppSelector(state => state.product.currentProductData); // 선택된 제품 정보
  const [middleCategory, setMiddleCategory] = useState(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  window.addEventListener("resize", handleWindowResize);

  //제품 목록 받아오기
  useEffect(() => {
    dispatch(resetProductForm());
    if (productCategorySelected) {
      productApi.getAllProducts(currentProductCategoryName)
        .then(res => dispatch(getProductList({productList: res})))
    }
  }, [currentProductCategoryName]);

  // 중분류 카테고리 open
  const openMiddleCategory = () => setMiddleCategory(middleCategory => !middleCategory);

  // 중분류 카테고리 close
  const closeMiddleCategory = () => setMiddleCategory(false);

  // 제품 삭제
  const deleteProduct = (productId: number) => {
    productApi.deleteProduct(productId)
      .then(res => {
        productApi.getAllProducts(currentProductCategoryName)
          .then(res => {
            successDelete();
            dispatch(getProductList({productList: res}));
          })
          .catch(error => console.log(error))
        dispatch(clickProductItemGoBack());
      })
      .catch(error => {
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
            }, index: number) => (
              <ProductItem key={item.id} product={item} index={index}/>
            )) : // 제품 존재하지 않는 경우
            <Typography>
              해당 카테고리에 제품이 존재하지 않습니다.
            </Typography>}
        </Grid>
      </DndProvider>
    )
  }

  return (
    <>
      {!productCategorySelected &&
        <Box sx={{p: 5, m: 'auto', width: '70vw', display: 'flex', justifyContent: 'center'}}>
          <ProductMainCategory windowSize={windowSize} successDelete={successDelete}
                               openMiddleCategory={openMiddleCategory}/>
        </Box>
      }

      {/* category selected */}
      {productCategorySelected &&
        <Box>
          <Box sx={{m: 'auto', mt: 5, width: '70vw'}}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
              {[
                <Typography sx={{fontSize: 'large'}} key="1">대분류 카테고리</Typography>,
                <Typography sx={{fontSize: 'large'}} key="1">중분류 카테고리</Typography>,
                <Typography sx={{fontSize: 'large', fontWeight: 'bold'}} key="2">제품 목록</Typography>
              ]}
            </Breadcrumbs>
          </Box>

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
              <MenuSelect
                defaultValue={currentProductCategoryName}
                onChange={(event: any) => {
                  dispatch(selectProductCategoryTrue());
                  dispatch(setCurrentProductCategoryName({category: event?.target.value}));
                }}
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
              </MenuSelect>
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
      }

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={productItemState}
        title='제품 삭제'
        text1='해당 제품이 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => deleteProduct(currentProductData.id)}
        closeAction={() => dispatch(clickProductItemGoBack())}/>

      {/* 중분류 카테고리 */}
      <ProductMiddleCategory
        windowSize={windowSize}
        open={middleCategory}
        onClose={closeMiddleCategory}/>
    </>
  )
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
})) as typeof Box