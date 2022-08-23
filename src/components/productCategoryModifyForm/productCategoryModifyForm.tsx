import React from 'react';
import { categoryApi } from '../../network/category';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteProductCategoryImage, updateCurrentProductCategoryImage, updateCurrentProductCategoryName } from '../../app/reducers/categorySlice';
import { addProductCategoryImage } from '../../app/reducers/categorySlice';
import { clickProductCategoryFormGoBack } from '../../app/reducers/dialogSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

export default function ProductCategoryModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productCategoryForm = new FormData(); // 카테고리 폼 데이터

  const productCategoryFormState = useAppSelector(state => state.dialog.productCategoryFormState); // 카테고리 변경 취소 dialog
  const productCurrentCategory = useAppSelector(state => state.category.productCurrentCategory); // 선택된 카테고리 정보 state


  // 카테고리 수정
  const postProductCategory = (categoryId: number, categoryForm: FormData) => {
    categoryApi.putUpdateCategory(categoryId, categoryForm)
      .then(res => {
        navigate(-1);
        alert('변경되었습니다.')
      })
  };

  // 제품 사진 미리보기
  const selectCategoryImage = (event: any) => {
    dispatch(addProductCategoryImage({ image: URL.createObjectURL(event.target.files[0]) }));
    dispatch(updateCurrentProductCategoryImage({ image: event.target.files[0] }));
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>카테고리 변경</Typography>

      <Spacing />

      {/* 제품 등록 폼 */}
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
            value={productCurrentCategory.categoryName}
            placeholder='카테고리명'
            onChange={event => dispatch(updateCurrentProductCategoryName({ categoryName: event?.target.value }))}
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
                  onClick={() => dispatch(deleteProductCategoryImage())}
                  sx={{ color: 'darkgreen', cursor: 'pointer' }} />
              </Box>
              {/* 수정 */}
              <img src={productCurrentCategory.imageServerFilename} alt='제품 사진' width='100%' />
            </Box>
          </Container>
        </Box>
      </Box >

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('변경완료', () => postProductCategory(productCurrentCategory.id, productCategoryForm))}
        {EditButton('변경취소', () => dispatch(clickProductCategoryFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={productCategoryFormState}
        title='변경 취소'
        text1='변경중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          dispatch(clickProductCategoryFormGoBack());
          navigate(-1);
        }}
        closeAction={() => dispatch(clickProductCategoryFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;