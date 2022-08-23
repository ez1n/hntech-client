import React, { useEffect } from 'react';
import { categoryApi } from '../../network/category';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAllProductCategories } from '../../app/reducers/categorySlice';
import { Box } from '@mui/material';
import ProductCategories from './productCategories';
import ProductItem from './productItem';

export default function Products() {
  const dispatch = useAppDispatch();

  const productCategorySelected = useAppSelector(state => state.category.productCategorySelected); // 카테고리 선택 state

  //  제품 카테고리 목록 받아오기
  useEffect(() => {
    categoryApi.getAllProductCategories()
      .then(res => dispatch(setAllProductCategories({ categories: res.categories })));
  }, []);

  return (
    <Box sx={{ display: 'flex', ml: 25, mr: 25 }}>
      {/* default */}
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
            <ProductItem />
          </Box>
        </>
      }
    </Box>
  )
};

