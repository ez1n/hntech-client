import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Stack, Typography } from '@mui/material';

export default function QuestionContent() {
  const detail = useAppSelector(state => state.question.detail); // 문의 정보 (데이터)

  return (
    <Box sx={{
      borderTop: '3px solid #2E7D32',
      borderBottom: '3px solid #2E7D32',
    }}>
      {/* 제목 */}
      <Box sx={{ borderBottom: '1px solid #3B6C46', p: 2 }}>
        <Typography sx={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {detail.title}
        </Typography>
      </Box>

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
        <Typography sx={{ fontSize: 18 }}>작성자 {detail.writer}</Typography>
        <Typography sx={{ fontSize: 18 }}>|</Typography>
        <Typography sx={{ fontSize: 18 }}>작성일 {detail.createTime}</Typography>
      </Stack>

      {/* 문의 내용 */}
      <Box sx={{ p: 3, minHeight: 300 }}>
        {detail.content.split('\n').map((value, index) => (
          <Typography key={index} sx={{ fontSize: 18 }}>
            {value}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}