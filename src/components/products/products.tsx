import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box } from '@mui/material';
import ProductCategories from './productCategories';
import ProductItem from './productItem';
import { productApi } from '../../network/product';
import { getProductList } from '../../app/reducers/productSlice';

export default function Products() {
  const dispatch = useAppDispatch();

  const productCategorySelected = useAppSelector(state => state.category.productCategorySelected); // 카테고리 선택 state
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state
  const productList = useAppSelector(state => state.product.productList); // 제품 목록

  //제품 목록 받아오기
  useEffect(() => {
    productApi.getAllProducts(currentProductCategoryName)
      .then(res => dispatch(getProductList({ productList: res })))
      .catch(error => console.log(error))
  }, [currentProductCategoryName]);

  return (
    <Box sx={{ display: 'flex', ml: 25, mr: 25 }}>
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
                ))
                }
              </Box>
            </DndProvider>
          </Box>
        </>
      }
    </Box >
  )
};

