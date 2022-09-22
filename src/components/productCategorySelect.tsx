import React from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {addProductCategory} from '../app/reducers/productFormSlice';
import {Box, MenuItem, Select, styled} from '@mui/material';

interface propsType {
  defaultCategory: string
}

export default function ProductCategorySelect({defaultCategory}: propsType) {
  const dispatch = useAppDispatch();

  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록

  return (
    <TotalBox>
      <Select
        size={'small'}
        defaultValue={defaultCategory && defaultCategory}
        onChange={event => dispatch(addProductCategory({category: event?.target.value}))}
        sx={{textAlign: 'center', width: '100%'}}
      >
        {productCategories.map((item, index) => (
          <MenuItem key={index} value={item.categoryName}>{item.categoryName}</MenuItem>
        ))}
      </Select>
    </TotalBox>
  )
};

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '40%'
  },
  width: '20%',
  height: 'max-content',
  margin: 10
})) as typeof Box;