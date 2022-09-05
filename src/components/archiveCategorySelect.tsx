import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateArchiveCategory } from '../app/reducers/archiveFormSlice';
import { MenuItem, Select, FormControl, FormHelperText } from '@mui/material';

interface propsType {
  defaultCategory: string | null,
  categoryErrorMsg: string | undefined
}

export default function ArchiveCategorySelect({ defaultCategory, categoryErrorMsg }: propsType) {
  const dispatch = useAppDispatch();

  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록

  return (
    <FormControl error={categoryErrorMsg ? true : false} sx={{ width: '20%', }}>
      <Select
        size={'small'}
        defaultValue={defaultCategory ? defaultCategory : undefined}
        onChange={event => dispatch(updateArchiveCategory({ categoryName: event.target.value }))}
        sx={{ m: 1, textAlign: 'center' }}>
        {defaultCategory === '전체' && <MenuItem value={'전체'}>전체</MenuItem>}
        {archiveCategory.map((item: { id: number, categoryName: string }) => (
          <MenuItem key={item.id} value={item.categoryName}>{item.categoryName}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{categoryErrorMsg}</FormHelperText>
    </FormControl>
  )
} 