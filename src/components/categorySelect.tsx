import React from 'react';
import { MenuItem, Select } from '@mui/material';


export default function CategorySelect() {
  // 임시 데이터
  const data = ['전체', '일반자료', '승인서', '스프링클러', '소방용밸브']

  return (
    <Select size={'small'} defaultValue={'전체'} sx={{ width: '15%', m: 1, textAlign: 'center' }}>
      {data.map((item, index) => (
        <MenuItem key={index} value={item}>{item}</MenuItem>
      ))}
    </Select>
  )
} 