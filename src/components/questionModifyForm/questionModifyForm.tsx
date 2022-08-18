import React from 'react';
import { api } from '../../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickQuestionModifyFormGoBack } from '../../app/reducers/dialogSlice';
import { setDetailData } from '../../app/reducers/questionSlice';
import { Container, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import ModifyForm from './modifyForm';
import CancelModal from '../cancelModal';

export default function QuestionModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const questionModifyFormState = useAppSelector(state => state.dialog.questionModifyFormState); // 글쓰기 취소 state
  const detail = useAppSelector(state => state.question.detail); // 문의 정보 (데이터)
  const currentQuestion = useAppSelector(state => state.question.currentQuestion); // 수정용 정보

  // 문의사항 변경하기
  const putQuestion = (questionId: number, currentQuestion: {}) => {
    api.putQuestion(questionId, currentQuestion)
      .then(res => {
        dispatch(setDetailData(res));
        navigate('/question-detail');
      })
      .catch(error => console.log(error))
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
        {EditButton('변경완료', () => putQuestion(detail.id, currentQuestion))}
        {EditButton('변경취소', () => dispatch(clickQuestionModifyFormGoBack()))}
      </Spacing>

      {/* 변경취소 Dialog */}
      <CancelModal
        openState={questionModifyFormState}
        title={'변경 취소'}
        text1={'변경중인 내용이 사라집니다.'}
        text2={'취소하시겠습니까?'}
        yesAction={() => {
          navigate('/question-detail');
          dispatch(clickQuestionModifyFormGoBack());
        }}
        closeAction={() => dispatch(clickQuestionModifyFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;