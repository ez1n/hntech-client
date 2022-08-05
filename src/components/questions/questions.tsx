import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Box, Container, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import QuestionItem from './questionItem';

export default function Questions() {
  const navigate = useNavigate();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

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

      <Spacing />

      {/* 버튼 */}
      <Box
        onClick={() => {
          managerMode ?
            console.log('manager') :
            console.log('customer')
        }}
        sx={{ textAlign: 'end' }}>
        {EditButton(`${managerMode ? '글쓰기' : '문의하기'}`, () => navigate('/question-form'))}
      </Box>

      <Spacing />

      {/* 문의 목록 */}
      <QuestionItem />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 20
})) as typeof Container;