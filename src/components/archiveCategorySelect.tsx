import React from 'react';
import {useAppSelector} from '../app/hooks';
import {MenuItem, Select, FormControl, FormHelperText, styled} from '@mui/material';

interface propsType {
  defaultCategory: string | null,
  categoryErrorMsg?: string,
  getCategory: (e: any) => void
}

export default function ArchiveCategorySelect({defaultCategory, categoryErrorMsg, getCategory}: propsType) {
  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록

  return (
    <ArchiveCategoryFormControl error={!!categoryErrorMsg}>
      <Select
        size={'small'}
        defaultValue={defaultCategory ? defaultCategory : undefined}
        onChange={getCategory}
        sx={{textAlign: 'center'}}
        MenuProps={{style: {maxHeight: 300}}}
      >
        {defaultCategory === '전체' && <MenuItem value={'전체'} sx={{justifyContent: 'center'}}>전체</MenuItem>}
        {archiveCategory.map((item: { id: number, categoryName: string }) => (
          <MenuItem key={item.id} value={item.categoryName} sx={{justifyContent: 'center'}}>
            {item.categoryName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{categoryErrorMsg}</FormHelperText>
    </ArchiveCategoryFormControl>
  )
};

const ArchiveCategoryFormControl = styled(FormControl)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    width: '50%'
  },
  width: '20%'
})) as typeof FormControl;