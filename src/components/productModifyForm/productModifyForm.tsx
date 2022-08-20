import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickProductModifyFormGoBack } from '../../app/reducers/dialogSlice';
import { Container, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import ModifyForm from './modifyForm';
import CancelModal from '../cancelModal';

export default function ProductModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productModifyFormState = useAppSelector(state => state.dialog.productModifyFormState); // 글쓰기 취소 state

  // 제품 정보 수정
  const putProduct = () => {
    navigate(-1);
    alert('수정되었습니다.')
  }

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>제품 정보 수정</Typography>

      <Spacing />

      {/* 제품 등록 폼 */}
      <ModifyForm />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('수정', putProduct)}
        {EditButton('취소', () => dispatch(clickProductModifyFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={productModifyFormState}
        title='수정 취소'
        text1='수정중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          dispatch(clickProductModifyFormGoBack());
          navigate(-1);
        }}
        closeAction={() => dispatch(clickProductModifyFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;