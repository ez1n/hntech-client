import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateArchiveCategory } from '../app/reducers/archiveFormSlice';
import { MenuItem, Select } from '@mui/material';

interface propsType {
  defaultCategory: string | null
}

export default function ArchiveCategorySelect({ defaultCategory }: propsType) {
  const dispatch = useAppDispatch();

  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록

  return (
    <Select
      size={'small'}
      defaultValue={defaultCategory ? defaultCategory : archiveCategory[0].categoryName}
      onChange={event => dispatch(updateArchiveCategory({ categoryName: event.target.value }))}
      sx={{ width: '18%', m: 1, textAlign: 'center' }}>
      {defaultCategory === '전체' && <MenuItem value={'전체'}>전체</MenuItem>}
      {archiveCategory.map((item: { id: number, categoryName: string }) => (
        <MenuItem key={item.id} value={item.categoryName}>{item.categoryName}</MenuItem>
      ))}
    </Select>
  )
} 