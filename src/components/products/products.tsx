import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, Button, styled } from '@mui/material';
import ProductCategories from './productCategories';
import ProductItem from './productItem';
import { productApi } from '../../network/product';
import { getProductList, setProductItems } from '../../app/reducers/productSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productCategorySelected = useAppSelector(state => state.category.productCategorySelected); // 카테고리 선택 state
  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state
  const productItems = useAppSelector(state => state.product.productItems); // 제품 id 리스트 (dnd)

  //제품 목록 받아오기
  useEffect(() => {
    // productApi.getAllProducts(currentProductCategoryName)
    //   .then(res => dispatch(getProductList({ productList: res })))
    //   .catch(error => console.log(error))
    dispatch(getProductList({
      productList: [{
        id: 1,
        image: {
          id: 0,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'aa'
      },
      {
        id: 2,
        image: {
          id: 1,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'bb'
      },
      {
        id: 3,
        image: {
          id: 2,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'cc'
      },
      {
        id: 4,
        image: {
          id: 2,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'ddd'
      },
      {
        id: 5,
        image: {
          id: 2,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'e'
      },
      {
        id: 6,
        image: {
          id: 2,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'ffffffffff'
      },
      {
        id: 7,
        image: {
          id: 2,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'ggggg'
      },
      {
        id: 8,
        image: {
          id: 2,
          originalFilename: 'hi',
          savedPath: 'dd',
          serverFilename: 'gkgk',
        },
        productName: 'h'
      }]
    }))
  }, []);

  return (
    <Box sx={{ display: 'flex', ml: 25, mr: 25 }}>
      {!productCategorySelected &&
        <Box sx={{ p: 5, margin: 'auto', width: '100%', }}>
          {/* 카테고리 */}
          <ProductCategories />
        </Box>
      }

      {/* category selected */}
      {productCategorySelected &&
        <>
          {/* 사이드 메뉴 */}
          <Box sx={{ flex: 0.2 }}>
            <Box sx={{
              pt: 1,
              pb: 1,
              mt: 5,
              borderLeft: '4px solid rgb(46, 125, 50)',
              minWidth: '130px'
            }}>
              <ProductCategories />
            </Box>
          </Box>

          {/* 제품 목록 */}
          <Box sx={{ flex: 0.8, pt: 5 }}>
            <DndProvider backend={HTML5Backend}>
              <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                {productList.map((item: {
                  id: number,
                  image: {
                    id: number,
                    originalFilename: string,
                    savedPath: string,
                    serverFilename: string
                  },
                  productName: string
                }, index: number) => (
                  <ProductItem key={item.id} product={item} index={index} />
                ))}
              </Box>
            </DndProvider>
            {managerMode &&
              <AddButton onClick={() => navigate('/product-form')}>
                <AddRoundedIcon sx={{ color: '#042709', fontSize: 100, opacity: 0.6 }} />
              </AddButton>}
          </Box>
        </>
      }
    </Box >
  )
};

// 추가 버튼
const AddButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '100% !important'
  },
  width: '20%',
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

