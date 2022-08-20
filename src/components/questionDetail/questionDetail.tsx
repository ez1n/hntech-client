import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { clickQuestionDetailGoBack, clickQuestionStatusGoBack } from '../../app/reducers/dialogSlice';
import { setCurrentQuestion, setDetailData } from '../../app/reducers/questionSlice';
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
  const questionStatusState = useAppSelector(state => state.dialog.questionStatusState); // 게시글 상태 변경 취소 state
  const detail = useAppSelector(state => state.question.detail); // 게시글 정보 state

  // 수정 데이터 업데이트
  useEffect(() => {
    dispatch(setCurrentQuestion({ content: detail.content, title: detail.title }));
  }, []);

  // 게시글 삭제 요청
  const deleteQuestion = (id: number) => {
    api.deleteQuestion(id)
      .then(res => {
        dispatch(clickQuestionDetailGoBack());
        navigate('/question');
      });
  };

  // 게시글 처리 완료 요청
  const putUpdateQuestionStatus = (questionId: number) => {
    api.putUpdateQuestionStatus(questionId)
      .then(res => {
        dispatch(setDetailData({ detail: res }));
        dispatch(clickQuestionStatusGoBack());
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
        <Button
          onClick={() => dispatch(clickQuestionStatusGoBack())}
          disabled={detail.status === '완료' ? true : false}
          sx={{
            m: 1,
            color: '#2E7D32',
            border: '1px solid rgba(46, 125, 50, 0.5)',
            borderRadius: 2,
            backgroundColor: 'rgba(46, 125, 50, 0.1)'
          }}>
          답변완료
        </Button>
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
      {detail.comments.map((item) => (
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

      {/* 답변완료 Dialog */}
      <CancelModal
        openState={questionStatusState}
        title={'문의사항 처리상태 변경'}
        text1={'답변 완료된 게시글은 되돌릴 수 없습니다.'}
        text2={'변경 하시겠습니까?'}
        yesAction={() => putUpdateQuestionStatus(detail.id)}
        closeAction={() => dispatch(clickQuestionStatusGoBack())} />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;