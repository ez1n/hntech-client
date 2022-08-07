import React from 'react';
import { Box, Button, Container, Stack, styled, Typography } from '@mui/material';

export default function MainData() {
  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 5
      }}>
        <Typography
          variant='h5'
          sx={{
            p: 1,
            width: 'max-content',
            borderBottom: '3px solid #2E7D32',
            userSelect: 'none'
          }}>
          카다록 및 자재 승인서
        </Typography>
      </Container>

      <Stack direction='row' sx={{ width: '50%' }}>
        <Container sx={{ textAlign: 'center' }}>
          <FileBox>
            카다록 미리보기
          </FileBox>

          <FileButton onClick={() => console.log('파일 다운로드')}>
            카다록 다운로드
          </FileButton>
        </Container>

        <Container sx={{ textAlign: 'center' }}>
          <FileBox>
            자재 승인서 미리보기
          </FileBox>

          <FileButton onClick={() => console.log('파일 다운로드')}>
            자재 승인서 다운로드
          </FileButton>
        </Container>
      </Stack>
    </Box>
  )
};

// 미리보기 스타일
const FileBox = styled(Box)(() => ({
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '2px solid green',
  borderRadius: 8
}));

// 버튼 스타일
const FileButton = styled(Button)(() => ({
  color: '#FCFCFC',
  backgroundColor: 'green',
  marginTop: 25,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 10,
  fontSize: 15,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgb(66, 183, 72)'
  }
}));