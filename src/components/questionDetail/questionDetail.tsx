import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { clickQuestionDetailGoBack } from '../../app/reducers/dialogSlice';
import { setCurrentQuestion } from '../../app/reducers/questionSlice';
import {
  Box,
  Button,
  Container,
  styled,
  Typography
} from '@mui/material';
import EditButton from '../editButton';
import QuestionContent from './questionContent';
import Comment from './comment';
import CommentForm from './commentForm';
import CancelModal from '../cancelModal';

export default function QuestionDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const questionDetailState = useAppSelector(state => state.dialog.questionDetailState); // 게시글 삭제 취소 state
  const detail = useAppSelector(state => state.question.detail); // 게시글 정보 state
  const comments = useAppSelector(state => state.question.detail.comments); // 댓글 정보 (데이터) state

  // 수정 데이터 업데이트
  useEffect(() => {
    dispatch(setCurrentQuestion({ content: detail.content, title: detail.title }));
  }, [])

  // 게시글 삭제 요청
  const deleteQuestion = (id: number) => {
    api.deleteQuestion(id)
      .then(res => {
        dispatch(clickQuestionDetailGoBack());
        navigate('/question');
        alert('삭제되었습니다.');
      });
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography
        variant='h5'
        sx={{
          p: 1,
          width: 'max-content',
          borderBottom: '3px solid #2E7D32',
        }}>
        문의사항
      </Typography>

      {/* 버튼 */}
      <Spacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {EditButton('수정', () => navigate('/question-modify'))}
        {EditButton('삭제', () => dispatch(clickQuestionDetailGoBack()))}
      </Spacing>


      {/* 문의 내용 */}
      <QuestionContent />

      {/* 목록 버튼 */}
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          size='small'
          onClick={() => navigate('/question')}
          sx={{
            color: 'white',
            backgroundColor: '#2E7D32',
            fontWeight: 'bold'
          }}>
          목록
        </Button>
      </Box>

      <Spacing sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h6'>
          댓글
        </Typography>
      </Spacing>

      {/* 댓글 */}
      {comments.map((item) => (
        <Comment key={item.id} item={item} questionId={detail.id} />
      ))}

      <Spacing />

      {/* 댓글 폼 */}
      <CommentForm id={detail.id} />

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={questionDetailState}
        title={'게시글 삭제'}
        text1={'삭제된 게시글은 복구할 수 없습니다'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteQuestion(detail.id)}
        closeAction={() => dispatch(clickQuestionDetailGoBack())} />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;