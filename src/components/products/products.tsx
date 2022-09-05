import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, Button, styled } from '@mui/material';
import ProductCategories from './productCategories';
import ProductItem from './productItem';
import { productApi } from '../../network/product';
import { getProductList } from '../../app/reducers/productSlice';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router-dom';
import { resetProductForm } from '../../app/reducers/productFormSlice';

interface propsType {
  successDelete: () => void
}

export default function Products({ successDelete }: propsType) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productCategorySelected = useAppSelector(state => state.category.productCategorySelected); // 카테고리 선택 state
  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state

  //제품 목록 받아오기
  useEffect(() => {
    dispatch(resetProductForm());
    productApi.getAllProducts(currentProductCategoryName)
      .then(res => dispatch(getProductList({ productList: res })))
      .catch(error => console.log(error))
  }, [currentProductCategoryName]);

  return (
    <Box sx={{ display: 'flex', ml: 25, mr: 25 }}>
      {!productCategorySelected &&
        <Box sx={{ p: 5, margin: 'auto', width: '100%', }}>
          {/* 카테고리 */}
          <ProductCategories successDelete={successDelete} />
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
              <ProductCategories successDelete={successDelete} />
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

