import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addCategoryImage, deleteCategoryImage } from '../../app/reducers/productCategoryContentSlice';
import { updateCurrentCategoryImage, updateCurrentCategoryName } from '../../app/reducers/productCategorySlice';
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function ModifyForm() {
  const dispatch = useAppDispatch();

  const currentCategory = useAppSelector(state => state.productCategory.currentCategory); // 선택된 카테고리 정보 state

  // 제품 사진 미리보기
  const selectCategoryImage = (event: any) => {
    dispatch(addCategoryImage({ image: URL.createObjectURL(event.target.files[0]) }));
    dispatch(updateCurrentCategoryImage({ image: event.target.files[0] }));
  };

  return (
    <Box sx={{
      borderTop: '3px solid #2E7D32',
      borderBottom: '3px solid #2E7D32',
    }}>

      {/* 제목 */}
      <Box sx={{
        textAlign: 'center',
        borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
        p: 2
      }}>
        <TextField
          type='text'
          required={true}
          value={currentCategory.categoryName}
          placeholder='카테고리명'
          onChange={event => dispatch(updateCurrentCategoryName({ categoryName: event?.target.value }))}
          inputProps={{
            style: {
              fontSize: 20
            }
          }}
          sx={{
            width: '100%'
          }}
        />
      </Box>

      <Stack direction='row' sx={{ mt: 2, alignItems: 'center' }}>
        {/* 사진 변경 */}
        <Box sx={{ pl: 1 }}>
          <label className='categoryUploadButton' htmlFor='productCategoryInput'>
            사진 변경
            <input type='file' id='productCategoryInput' accept='image/*' onChange={(event) => selectCategoryImage(event)} />
          </label>
        </Box>

        <FormControlLabel
          control={<Checkbox sx={{
            color: 'darkgrey',
            '&.Mui-checked': {
              color: 'green',
            },
          }} />}
          onChange={event => console.log('#')}
          label='메인 카테고리'
          labelPlacement='start'
          sx={{ color: 'darkgrey' }} />
      </Stack>

      {/* 제품 사진 미리보기 */}
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)', }}>
        <Container
          sx={{
            border: '1.8px solid lightgrey',
            borderRadius: 1,
            mb: 2,
            height: 300,
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            alignItems: 'center'
          }}>
          <Box sx={{ width: '23%', m: 1 }}>
            <Box sx={{ textAlign: 'end' }}>
              <ClearRoundedIcon
                onClick={() => dispatch(deleteCategoryImage())}
                sx={{ color: 'darkgreen', cursor: 'pointer' }} />
            </Box>
            <img src={currentCategory.image.originalFilename} alt='제품 사진' width='100%' />
          </Box>
        </Container>
      </Box>
    </Box >
  )
}