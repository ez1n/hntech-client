import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { updateArchiveCategory } from '../app/reducers/formContentSlice';
import { MenuItem, Select } from '@mui/material';

export default function CategorySelect() {
  const dispatch = useAppDispatch();

  // 임시 데이터
  const data = ['전체', '일반자료', '승인서', '스프링클러', '소방용밸브']

  return (
    <Select
      size={'small'}
      defaultValue={'전체'}
      onChange={event => dispatch(updateArchiveCategory({ category: event.target.value }))}
      sx={{ width: '18%', m: 1, textAlign: 'center' }}>
      {data.map((item, index) => (
        <MenuItem key={index} value={item}>{item}</MenuItem>
      ))}
    </Select>
  )
} 