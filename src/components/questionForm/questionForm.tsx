import React from 'react';
import { Box, Container, Stack, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import { useNavigate } from 'react-router-dom';

export default function QuestionForm() {
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
        문의하기
      </Typography>

      <Spacing />

      <Box>
        문의사항 폼
      </Box>

      <Spacing />

      {/* 버튼 */}
      <Stack
        direction='row'
        spacing={1}
        sx={{ justifyContent: 'center' }}>
        {EditButton('취소', () => navigate('/question'))}
        {EditButton('작성완료', console.log('#'))}
      </Stack>

      <Spacing />

    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 20
})) as typeof Container;