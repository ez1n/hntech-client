import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateArchiveCategory } from '../app/reducers/archiveSlice';
import { MenuItem, Select } from '@mui/material';

export default function ProductCategorySelect(defaultCategory: string) {
  const dispatch = useAppDispatch();

  const categoryList = useAppSelector(state => state.productCategory.categories); // 카테고리 목록

  return (
    <Select
      size={'small'}
      defaultValue={defaultCategory}
      onChange={event => dispatch(updateArchiveCategory({ categoryName: event.target.value }))}
      sx={{ width: '18%', m: 1, textAlign: 'center' }}>
      {categoryList.map((item, index) => (
        <MenuItem key={index} value={item.categoryName}>{item.categoryName}</MenuItem>
      ))}
    </Select>
  )
} 