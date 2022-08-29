import React from 'react';
import { Box, Button, Container, Stack, styled, Typography } from '@mui/material';
import { fileApi } from '../network/file';
import { useAppSelector } from '../app/hooks';

export default function MainData() {
  const documentFile = useAppSelector(state => state.manager.document); // 카다록, 자재승인서 정보

  // 파일 다운로드
  const downloadFile = (serverFilename: string, originalFilename: string) => {
    fileApi.downloadFile(serverFilename)
      .then(res => {
        return res;
      })
      .then(file => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = originalFilename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch(error => console.log(error))
  };

  return (
    <Box sx={{ p: 5, pt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 10
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

          <FileButton onClick={() => downloadFile(documentFile.catalogServerFilename, documentFile.catalogOriginalFilename)}>
            카다록 다운로드
          </FileButton>
        </Container>

        <Container sx={{ textAlign: 'center' }}>
          <FileBox>
            자재 승인서 미리보기
          </FileBox>

          <FileButton onClick={() => downloadFile(documentFile.materialServerFilename, documentFile.materialOriginalFilename)}>
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