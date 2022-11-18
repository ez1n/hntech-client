import React, {useEffect, useState} from 'react';
import {MenuItem, Select} from '@mui/material';
import {categoryApi} from "../network/category";

interface propsType {
  defaultCategory: string | null,
  getCategory: (e: any) => void
}

export default function ArchiveCategorySelect({defaultCategory, getCategory}: propsType) {
  const [archiveCategory, setArchiveCategory] = useState<{ id: number, categoryName: string, isArchiveCategory: boolean }[]>([]);

  useEffect(() => {
    categoryApi.getAllCategories()
      .then(res => setArchiveCategory(res))
  }, []);

  return (
      <Select
        size={'small'}
        value={defaultCategory ? defaultCategory : undefined}
        onChange={getCategory}
        sx={{textAlign: 'center', width: '100%'}}
        MenuProps={{style: {maxHeight: 300}}}
      >
        {defaultCategory === '전체' && <MenuItem value={'전체'} sx={{justifyContent: 'center'}}>전체</MenuItem>}
        {archiveCategory.map((item: { id: number, categoryName: string }) => (
          <MenuItem key={item.id} value={item.categoryName} sx={{justifyContent: 'center'}}>
            {item.categoryName}
          </MenuItem>
        ))}
      </Select>
  )
};