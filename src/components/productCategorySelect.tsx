import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addProductCategory } from '../app/reducers/productFormSlice';
import { MenuItem, Select, styled } from '@mui/material';

interface propsType {
  defaultCategory: string
}

export default function ProductCategorySelect({ defaultCategory }: propsType) {
  const dispatch = useAppDispatch();

  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록

  return (
    <ProductSelect
      size={'small'}
      defaultValue={defaultCategory && defaultCategory}
      onChange={event => dispatch(addProductCategory({ category: event.target.value }))}
    >
      {productCategories.map((item, index) => (
        <MenuItem key={index} value={item.categoryName}>{item.categoryName}</MenuItem>
      ))}
    </ProductSelect>
  )
};

const ProductSelect = styled(Select)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '40%'
  },
  width: '18%',
  height: 'max-content',
  margin: 10,
  textAlign: 'center'
}));