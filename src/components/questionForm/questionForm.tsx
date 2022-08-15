import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../network/network';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickQuestionFormGoBack } from '../../app/reducers/dialogSlice';
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

export default function QuestionForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const questionFormState = useAppSelector(state => state.dialog.questionFormState); // 글쓰기 취소 state
  const questionContent = useAppSelector(state => state.questionContent.questionContent); // 문의사항 폼 정보 state

  // 문의사항 작성하기
  const postCreateQuestion = () => {
    api.postCreateQuestion(questionContent)
      .then(res => {
        alert('등록되었습니다.');
        navigate('/question');
      })
      .catch(error => console.log('error', error))
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>문의하기</Typography>

      <Spacing />

      {/* 문의 글쓰기 폼 */}
      <Form />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('작성완료', postCreateQuestion)}
        {EditButton('취소', () => dispatch(clickQuestionFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <Dialog
        open={questionFormState}
        onClose={() => dispatch(clickQuestionFormGoBack())}>
        <DialogTitle>
          작성 취소
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
            navigate(-1);
            dispatch(clickQuestionFormGoBack());
          }}>
            네
          </Button>
          <Button onClick={() => dispatch(clickQuestionFormGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;