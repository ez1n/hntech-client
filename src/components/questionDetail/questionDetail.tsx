import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import QuestionContent from './questionContent';
import Comment from './comment';
import CommentForm from './commentForm';

export default function QuestionDetail() {
  const navigate = useNavigate();

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
        {EditButton('삭제', () => console.log('#'))}
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
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;