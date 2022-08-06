import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Button, Stack, Typography } from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

export default function Comment() {
  const managerMode = useAppSelector(state => state.manager.managerMode);

  // 임시데이터 (댓글)
  const data = [
    { writer: '작성자', content: 'ㅇㅇㅇ 인가요?' },
    { writer: '관리자', content: '★★★ 입니다.' },
  ];

  return (
    <>
      {data.map((item, index) => (
        <Stack direction='row' sx={{
          borderBottom: '1px solid #2E7D32',
          flexDirection: `${item.writer === '작성자' && 'row-reverse'}`,
          textAlign: `${item.writer === '작성자' && 'end'}`
        }}>
          {/*  댓글 내용 */}
          <Stack
            key={index}
            direction='column'
            spacing={1}
            sx={{
              p: 2,
              width: '100%',
            }}>
            <Typography sx={{ fontSize: 20 }}>{item.writer}</Typography>
            <Typography>{item.content}</Typography>
          </Stack>

          {/* 수정, 삭제 버튼 */}
          {managerMode ?
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={{ color: '#0F0F0F' }}>
                <MoreVertTwoToneIcon sx={{ fontSize: 30 }} />
              </Button>
            </Box> :
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={{ color: '#0F0F0F', display: `${item.writer === '관리자' && 'none'}` }}>
                <MoreVertTwoToneIcon sx={{ fontSize: 30 }} />
              </Button>
            </Box>
          }
        </Stack>
      ))}
    </>
  )
}