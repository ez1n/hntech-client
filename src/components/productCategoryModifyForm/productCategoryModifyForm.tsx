import React from 'react';
import { api } from '../../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickProductCategoryFormGoBack } from '../../app/reducers/dialogSlice';
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
import ModifyForm from './modifyForm';

export default function ProductCategoryModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productCategoryForm = new FormData(); // 카테고리 폼 데이터

  const productCategoryFormState = useAppSelector(state => state.dialog.productCategoryFormState); // 카테고리 변경 취소 dialog
  const currentCategory = useAppSelector(state => state.productCategory.currentCategory); // 선택된 카테고리 정보 state

  // 카테고리 수정
  const postProductCategory = (categoryId: number, categoryForm: FormData) => {
    api.putUpdateCategory(categoryId, categoryForm)
      .then(res => {
        navigate(-1);
        alert('변경되었습니다.')
      })
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>카테고리 변경</Typography>

      <Spacing />

      {/* 제품 등록 폼 */}
      <ModifyForm />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('변경완료', () => postProductCategory(currentCategory.id, productCategoryForm))}
        {EditButton('변경취소', () => dispatch(clickProductCategoryFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <Dialog
        open={productCategoryFormState}
        onClose={() => dispatch(clickProductCategoryFormGoBack())}>
        <DialogTitle>
          {'변경 취소'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            변경중인 내용이 사라집니다.
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