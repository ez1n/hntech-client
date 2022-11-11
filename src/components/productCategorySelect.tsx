import React from 'react';
import {Box, MenuItem, Select, styled} from '@mui/material';

interface propsType {
  defaultCategory: string,
  category: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string
  }[],
  getCategory: (category: string) => void
}

export default function ProductCategorySelect({defaultCategory, category, getCategory}: propsType) {
  return (
      <Select
        size='small'
        defaultValue={defaultCategory && defaultCategory}
        onChange={event => getCategory(event?.target.value)}
        sx={{textAlign: 'center', width: '100%'}}
      >
        {category.map((item, index) => (
          <MenuItem key={index} value={item.categoryName} sx={{justifyContent: 'center'}}>{item.categoryName}</MenuItem>
        ))}
      </Select>
  )
};