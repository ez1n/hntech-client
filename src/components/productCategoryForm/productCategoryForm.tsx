import React from 'react';
import { api } from '../../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickProductCategoryFormGoBack } from '../../app/reducers/dialogSlice';
import { addCategoryImage } from '../../app/reducers/productCategoryContentSlice';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography
} from '@mui/material';
import EditButton from '../editButton';
import Form from './form';

export default function ProductCategoryForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productCategoryForm = new FormData(); // 카테고리 폼 데이터

  const productCategoryFormState = useAppSelector(state => state.dialog.productCategoryFormState); // 카테고리 등록 취소 dialog
  const categoryName = useAppSelector(state => state.productCategoryContent.categoryName); // 카테고리 이름 state
  const categoryImage = useAppSelector(state => state.productCategoryContent.categoryImage); // 카테고리 이미지 state

  // 카테고리 등록
  const postProductCategory = () => {
    productCategoryForm.append('file', categoryImage);
    api.postUploadFile(productCategoryForm)
      .then(res => {
        api.postCreateCategory({
          categoryName: categoryName,
          imageFileId: res.id,
          type: "product"
        })
          .then(res => {
            alert('등록되었습니다.');
            dispatch(addCategoryImage({ image: null }));
            navigate('/product');
          })
          .catch(error => console.log(error))
      })
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>카테고리 등록</Typography>

      <Spacing />

      {/* 제품 등록 폼 */}
      <Form />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('등록완료', postProductCategory)}
        {EditButton('취소', () => dispatch(clickProductCategoryFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <Dialog
        open={productCategoryFormState}
        onClose={() => dispatch(clickProductCategoryFormGoBack())}>
        <DialogTitle>
          {'작성 취소'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            작성중인 내용이 사라집니다.
          </DialogContentText>
          <DialogContentText>
            취소하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            dispatch(clickProductCategoryFormGoBack());
            navigate(-1);
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickProductCategoryFormGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;