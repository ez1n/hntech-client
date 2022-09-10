import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';
import QuestionItem from './questionItem';

export default function Questions() {
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
      <Box sx={{ textAlign: 'end' }}>
        <EditButton name='글쓰기' onClick={() => navigate('/question-form')} />
      </Box>

      {/* 문의 목록 */}
      <QuestionItem />
    </Container>
  )
};