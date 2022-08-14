import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../network/network';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickQuestionModifyFormGoBack } from '../../app/reducers/dialogSlice';
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
import ModifyForm from './modifyForm';

export default function QuestionModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const questionModifyFormState = useAppSelector(state => state.dialog.questionModifyFormState); // 글쓰기 취소 state
  const detail = useAppSelector(state => state.question.detail); // 문의 정보 (데이터)
  const currentQuestion = useAppSelector(state => state.question.currentQuestion); // 수정용 정보

  // 문의사항 변경하기
  const putCreateQuestion = (questionId: number) => {
    api.putQuestion(questionId, currentQuestion)
      .then(res => {
        navigate(-1);
        alert('변경되었습니다.')
      })
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>문의사항 수정</Typography>

      <Spacing />

      {/* 문의 글쓰기 폼 */}
      <ModifyForm />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('변경완료', () => putCreateQuestion(detail.id))}
        {EditButton('변경취소', () => dispatch(clickQuestionModifyFormGoBack()))}
      </Spacing>

      {/* 변경취소 Dialog */}
      <Dialog
        open={questionModifyFormState}
        onClose={() => dispatch(clickQuestionModifyFormGoBack())}>
        <DialogTitle>
          변경 취소
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
            navigate(-1);
            dispatch(clickQuestionModifyFormGoBack());
          }}>
            네
          </Button>
          <Button onClick={() => dispatch(clickQuestionModifyFormGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;