import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateProductCategory } from '../app/reducers/productFormSlice';
import { MenuItem, Select } from '@mui/material';

export default function ProductCategorySelect(defaultCategory: string) {
  const dispatch = useAppDispatch();

  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록

  return (
    <Select
      size={'small'}
      defaultValue={defaultCategory}
      onChange={event => dispatch(updateProductCategory({ categoryName: event.target.value }))}
      sx={{ width: '18%', m: 1, textAlign: 'center' }}>
      {productCategories.map((item, index) => (
        <MenuItem key={index} value={item.categoryName}>{item.categoryName}</MenuItem>
      ))}
    </Select>
  )
} 