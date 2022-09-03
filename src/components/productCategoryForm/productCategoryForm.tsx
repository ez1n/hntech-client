import React from 'react';
import { categoryApi } from '../../network/category';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickProductCategoryFormGoBack } from '../../app/reducers/dialogSlice';
import { updateProductCategoryImage, updateProductCategoryShowInMain } from '../../app/reducers/categorySlice';
import {
  addProductCategoryImage,
  deleteProductCategoryImage,
  updateProductCategoryName
} from '../../app/reducers/categorySlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

export default function ProductCategoryForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productCategoryForm = new FormData(); // 카테고리 폼 데이터

  const productCategoryFormState = useAppSelector(state => state.dialog.productCategoryFormState); // 카테고리 등록 취소 dialog
  const productCategoryName = useAppSelector(state => state.category.productCategoryName); // 카테고리 이름 state
  const productCategoryImage = useAppSelector(state => state.category.productCategoryImage); // 카테고리 이미지 state
  const productCategoryImagePath = useAppSelector(state => state.category.productCategoryImagePath); // 카테고리 이미지 미리보기 state
  const productCategoryShowInMain = useAppSelector(state => state.category.productCategoryShowInMain); // 메인 카테고리 설정 state

  // 제품 사진
  const selectCategoryImage = (event: any) => {
    // 미리보기
    dispatch(addProductCategoryImage({ image: URL.createObjectURL(event.target.files[0]) }));
    // 전송할 데이터 업데이트
    dispatch(updateProductCategoryImage({ categoryImage: event.target.files[0] }));
  };

  // 카테고리 등록
  const postProductCategory = () => {
    productCategoryForm.append('image', productCategoryImage);
    productCategoryForm.append('categoryName', productCategoryName);
    productCategoryForm.append('showInMain', productCategoryShowInMain);
    productCategoryForm.append('type', 'product');

    categoryApi.postCreateCategory(productCategoryForm)
      .then(res => {
        console.log(productCategoryForm.get('file'))
        dispatch(addProductCategoryImage({ image: undefined }));
        navigate('/product');
      })
      .catch(error => console.log(error))
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>카테고리 등록</Typography>

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
            autoFocus={true}
            placeholder='카테고리명'
            onChange={event => dispatch(updateProductCategoryName({ categoryName: event?.target.value }))}
            inputProps={{ style: { fontSize: 20 } }}
            sx={{
              width: '100%'
            }}
          />
        </Box>

        <Stack direction='row' sx={{ mt: 2, alignItems: 'center' }}>
          {/* 사진 추가 */}
          <Box sx={{ pl: 1 }}>
            <label className='categoryUploadButton' htmlFor='productCategoryInput'>
              사진 추가
              <input type='file' id='productCategoryInput' accept='image/*' onChange={(event) => selectCategoryImage(event)} />
            </label>
          </Box>

          <FormControlLabel
            control={<Checkbox
              onChange={event => dispatch(updateProductCategoryShowInMain({ showInMain: event?.target.checked }))}
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
            {!productCategoryImagePath ?
              <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>제품 사진 미리보기</Typography> :
              <Box sx={{ width: '23%', m: 1 }}>
                <Box sx={{ textAlign: 'end' }}>
                  <ClearRoundedIcon
                    onClick={() => dispatch(deleteProductCategoryImage())}
                    sx={{ color: 'darkgreen', cursor: 'pointer' }} />
                </Box>
                <img src={productCategoryImagePath} alt='제품 사진' width='100%' />
              </Box>
            }
          </Container>
        </Box>
      </Box>

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('등록완료', postProductCategory)}
        {EditButton('취소', () => dispatch(clickProductCategoryFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={productCategoryFormState}
        title='작성 취소'
        text1='작성중인 내용이 사라집니다.'
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