import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box } from '@mui/material';
import ProductCategories from './productCategories';
import ProductItem from './productItem';

export default function Products() {
  const categorySelected = useAppSelector(state => state.productCategory.selected); // 카테고리 선택 state

  return (
    <Box sx={{ display: 'flex' }}>
      {/* default */}
      {!categorySelected &&
        <Box sx={{ p: 5 }}>
          {/* 카테고리 */}
          <ProductCategories />
        </Box>
      }

      {/* category selected */}
      {categorySelected &&
        <>
          {/* 사이드 메뉴 */}
          <Box sx={{ flex: 0.3 }}>
            <Box sx={{
              ml: '50%',
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
          <Box sx={{ flex: 0.7, pt: 5, mr: '10%' }}>
            <ProductItem />
          </Box>
        </>
      }
    </Box>
  )
};

