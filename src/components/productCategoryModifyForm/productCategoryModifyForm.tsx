import React, { useState } from 'react';
import { api } from '../../network/network';
import { categoryApi } from '../../network/category';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  updateCurrentProductCategoryName,
  updateCurrentProductCategoryShowInMain,
  updateProductCategoryImage
} from '../../app/reducers/categorySlice';
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
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function ProductCategoryModifyForm({ successModify, errorToast }: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productCategoryForm = new FormData(); // 카테고리 폼 데이터

  const productCategoryFormState = useAppSelector(state => state.dialog.productCategoryFormState); // 카테고리 변경 취소 dialog
  const productCurrentCategory = useAppSelector(state => state.category.productCurrentCategory); // 선택된 카테고리 정보 state
  const productCategoryImagePath = useAppSelector(state => state.category.productCategoryImagePath);
  const productCategoryImage = useAppSelector(state => state.category.productCategoryImage); // 카테고리 이미지 state
  const [titleErrorMsg, setTitleErrorMsg] = useState('');

  const validate = () => {
    let isValid = true;
    if (productCurrentCategory.categoryName === '' || productCurrentCategory.categoryName === null) {
      setTitleErrorMsg('카테고리 이름을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    return isValid;
  };

  // 제품 사진
  const selectCategoryImage = (event: any) => {
    // 미리보기
    dispatch(addProductCategoryImage({ image: URL.createObjectURL(event.target.files[0]) }));

    // 전송할 이미지
    dispatch(updateProductCategoryImage({ categoryImage: event.target.files[0] }));
  };

  // 카테고리 수정
  const putProductCategory = (categoryId: number) => {
    productCategoryImage === '' ? [].map(item => productCategoryForm.append('image', item)) : productCategoryForm.append('image', productCategoryImage);
    productCategoryForm.append('categoryName', productCurrentCategory.categoryName);
    productCategoryForm.append('showInMain', productCurrentCategory.showInMain);

    validate() &&
      categoryApi.putUpdateProductCategory(categoryId, productCategoryForm)
        .then(res => {
          successModify();
          dispatch(updateProductCategoryImage({ categoryImage: '' }));
          navigate('/product');
        })
        .catch(error => errorToast(error.response.data.message))
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
            error={titleErrorMsg ? true : false}
            helperText={titleErrorMsg}
            placeholder='카테고리명'
            onChange={event => dispatch(updateCurrentProductCategoryName({ categoryName: event?.target.value }))}
            inputProps={{ style: { fontSize: 20 } }}
            sx={{ width: '100%' }}
          />
        </Box>

        <Stack direction='row' sx={{ mt: 2, alignItems: 'center' }}>
          {/* 사진 변경 */}
          <Box sx={{ pl: 1 }}>
            <label className='categoryUploadButton' htmlFor='productCategoryInput' onChange={(event) => selectCategoryImage(event)} >
              사진 변경
              <input type='file' id='productCategoryInput' accept='image/*' />
            </label>
          </Box>

          {/* 메인 카테고리 */}
          <FormControlLabel
            control={<Checkbox
              defaultChecked={productCurrentCategory.showInMain === 'true' ? true : false}
              onChange={event => dispatch(updateCurrentProductCategoryShowInMain({ showInMain: event?.target.checked }))}
              sx={{
                color: 'darkgrey',
                '&.Mui-checked': {
                  color: 'green',
                },
              }} />}
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
            {productCategoryImagePath ?
              <Box sx={{ width: '23%', m: 1 }}>
                {/* 수정 */}
                <img src={productCategoryImagePath} alt='제품 사진' width='100%' />
              </Box> :
              <Box sx={{ width: '23%', m: 1 }}>
                <img src={`${api.baseUrl()}/files/category/${productCurrentCategory.imageServerFilename}`} alt='제품 사진' width='100%' />
              </Box>
            }
          </Container>
        </Box>
      </Box >

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('변경완료', () => putProductCategory(productCurrentCategory.id))}
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
          navigate('/product');
        }}
        closeAction={() => dispatch(clickProductCategoryFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;