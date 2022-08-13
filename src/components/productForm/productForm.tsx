import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickProductFormGoBack } from '../../app/reducers/dialogSlice';
import {
  Container,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import EditButton from '../editButton';
import Form from './form';

export default function ProductForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productFormState = useAppSelector(state => state.dialog.productFormState); // 글쓰기 취소 state
  const productContent = useAppSelector(state => state.productContent.productContent); // 제품 등록 내용

  const postProduct = () => {
    navigate(-1);
    alert('등록되었습니다.')
    console.log(productContent);
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>제품등록</Typography>

      <Spacing />

      {/* 제품 등록 폼 */}
      <Form />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('작성완료', postProduct)}
        {EditButton('취소', () => dispatch(clickProductFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <Dialog
        open={productFormState}
        onClose={() => dispatch(clickProductFormGoBack())}>
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
            dispatch(clickProductFormGoBack());
            navigate(-1);
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickProductFormGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;