import React from 'react';
import { api } from '../../network/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { clickQuestionDetailGoBack } from '../../app/reducers/dialogSlice';
import {
  Box,
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
import QuestionContent from './questionContent';
import Comment from './comment';
import CommentForm from './commentForm';

export default function QuestionDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const questionDetailState = useAppSelector(state => state.dialog.questionDetailState); // 게시글 삭제 취소 state
  const data = useAppSelector(state => state.questionDetail.data);

  const deleteQuestion = (id: number) => {
    api.deleteQuestion(id) // id 꺼내서 보내기
      .then(res => dispatch(clickQuestionDetailGoBack()));
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
        {EditButton('수정', () => console.log('#'))}
        {EditButton('삭제', () => deleteQuestion(data.id))}
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
      <Comment />

      <Spacing />

      {/* 댓글 폼 */}
      <CommentForm />

      {/* 삭제 버튼 Dialog */}
      <Dialog
        open={questionDetailState}
        onClose={() => dispatch(clickQuestionDetailGoBack())}>
        <DialogTitle>
          게시글 삭제
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            삭제된 게시글은 복구할 수 없습니다.
          </DialogContentText>
          <DialogContentText>
            삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            dispatch(clickQuestionDetailGoBack());
            navigate('/question');
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickQuestionDetailGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;