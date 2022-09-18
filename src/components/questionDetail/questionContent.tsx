import React, { useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useAppSelector } from '../../app/hooks';
import { Box, Stack, Typography, styled } from '@mui/material';

export default function QuestionContent() {
  const detail = useAppSelector(state => state.question.detail); // 문의 정보 (데이터)

  return (
    <Box sx={{
      borderTop: '3px solid #2E7D32',
      borderBottom: '3px solid #2E7D32',
    }}>
      {/* 제목 */}
      <DetailTitleBox>
        <DetailTitleTypography>
          {detail.title}
        </DetailTitleTypography>
      </DetailTitleBox>

      {/* 작성자, 작성일 */}
      <Stack
        direction='row'
        spacing={2}
        sx={{
          p: 2,
          color: 'darkgrey',
          justifyContent: 'flex-end',
          borderBottom: '1px solid #3B6C46'
        }}>
        <ContentTypography>작성자 {detail.writer}</ContentTypography>
        <ContentTypography>|</ContentTypography>
        <ContentTypography>작성일 {detail.createTime}</ContentTypography>
      </Stack>

      {/* 문의 내용 */}
      <Box sx={{ p: 3, minHeight: 300 }}>
        {detail.content.split('\n').map((value, index) => (
          <Typography key={index} sx={{ fontSize: 18 }}>
            {HTMLReactParser(value)}
          </Typography>
        ))}
      </Box>
    </Box>
  )
};

const DetailTitleBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 10
  },
  borderBottom: '1px solid #3B6C46',
  padding: 15
})) as typeof Box;

const DetailTitleTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 18
  },
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center'
})) as typeof Typography;

const ContentTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 15
  },
  fontSize: 18
})) as typeof Typography;