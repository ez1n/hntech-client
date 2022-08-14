import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  updateProductCategoryName,
  addCategoryImage,
  deleteCategoryImage,
  updateProductCategoryImage
} from '../../app/reducers/productCategoryContentSlice';
import {
  Box,
  Container,
  TextField,
  Typography
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function Form() {
  const dispatch = useAppDispatch();

  const categoryImagePath = useAppSelector(state => state.productCategoryContent.categoryImagePath); // 카테고리 이미지 state

  // 제품 사진 미리보기
  const selectCategoryImage = (event: any) => {
    dispatch(addCategoryImage({ image: URL.createObjectURL(event.target.files[0]) }));
    dispatch(updateProductCategoryImage({ categoryImage: event.target.files[0] }));
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
          autoFocus={true}
          placeholder='카테고리명'
          onChange={event => dispatch(updateProductCategoryName({ categoryName: event?.target.value }))}
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

      {/* 사진 추가 */}
      <Box sx={{ mt: 2, pl: 1 }}>
        <label className='categoryUploadButton' htmlFor='productCategoryInput'>
          사진 추가
          <input type='file' id='productCategoryInput' accept='image/*' onChange={(event) => selectCategoryImage(event)} />
        </label>
      </Box>

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
          {categoryImagePath === null ?
            <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>제품 사진 미리보기</Typography> :
            <Box sx={{ width: '23%', m: 1 }}>
              <Box sx={{ textAlign: 'end' }}>
                <ClearRoundedIcon
                  onClick={() => dispatch(deleteCategoryImage())}
                  sx={{ color: 'darkgreen', cursor: 'pointer' }} />
              </Box>
              <img src={categoryImagePath} alt='제품 사진' width='100%' />
            </Box>
          }
        </Container>
      </Box>
    </Box >
  )
}