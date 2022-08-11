import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickProductModifyFormGoBack } from '../../app/reducers/dialogSlice';
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
import Form from './modifyForm';

export default function ProductModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productModifyFormState = useAppSelector(state => state.dialog.productModifyFormState); // 글쓰기 취소 state

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>제품 정보 수정</Typography>

      <Spacing />

      {/* 제품 등록 폼 */}
      <Form />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('수정', () => navigate(-1))}
        {EditButton('취소', () => dispatch(clickProductModifyFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <Dialog
        open={productModifyFormState}
        onClose={() => dispatch(clickProductModifyFormGoBack())}>
        <DialogTitle>
          {'수정 취소'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            수정중인 내용이 사라집니다.
          </DialogContentText>
          <DialogContentText>
            취소하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            dispatch(clickProductModifyFormGoBack());
            navigate(-1);
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickProductModifyFormGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;