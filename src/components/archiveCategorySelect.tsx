import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateArchiveCategory } from '../app/reducers/archiveSlice';
import { MenuItem, Select } from '@mui/material';
import { getArchiveCategory } from '../app/reducers/archiveCategorySlice';

interface propsType {
  defaultCategory: string
}

export default function ArchiveCategorySelect({ defaultCategory }: propsType) {
  const dispatch = useAppDispatch();

  const category = useAppSelector(state => state.archiveCategory.category); // 카테고리 목록

  return (
    <Select
      size={'small'}
      defaultValue={defaultCategory}
      onChange={event => dispatch(updateArchiveCategory({ categoryName: event.target.value }))}
      sx={{ width: '18%', m: 1, textAlign: 'center' }}>
      {category.map((item, index) => (
        <MenuItem key={index} value={item}>{item}</MenuItem>
      ))}
    </Select>
  )
} 