import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../app/hooks';

export default function QuestionContent() {
  const data = useAppSelector(state => state.questionDetail.data); // 문의 정보 (데이터)

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
          {data.title}
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
        <Typography sx={{ fontSize: 18 }}>작성자 {data.writer}</Typography>
        <Typography sx={{ fontSize: 18 }}>|</Typography>
        <Typography sx={{ fontSize: 18 }}>작성일 {data.createTime}</Typography>
      </Stack>

      {/* 문의 내용 */}
      <Box sx={{ p: 3, minHeight: 300 }}>
        {data.content.split('\n').map((value, index) => (
          <Typography key={index} sx={{ fontSize: 18 }}>
            {value}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}