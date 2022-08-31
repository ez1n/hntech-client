import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addProductCategory } from '../app/reducers/productFormSlice';
import { MenuItem, Select } from '@mui/material';

interface propsType {
  defaultCategory: string
}

export default function ProductCategorySelect({ defaultCategory }: propsType) {
  const dispatch = useAppDispatch();

  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록

  return (
    <Select
      size={'small'}
      defaultValue={defaultCategory && defaultCategory}
      onChange={event => dispatch(addProductCategory({ category: event.target.value }))}
      sx={{ width: '18%', m: 1, textAlign: 'center' }}>
      {productCategories.map((item, index) => (
        <MenuItem key={index} value={item.categoryName}>{item.categoryName}</MenuItem>
      ))}
    </Select>
  )
} 