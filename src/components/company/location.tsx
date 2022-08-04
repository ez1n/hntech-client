import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';

export default function Location() {
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

  return (
    <Box p={5}>
      {/* 소제목 */}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant='h5'
          sx={{
            p: 1,
            width: 'max-content',
            borderBottom: '3px solid #2E7D32',
          }}>
          찾아오시는 길
        </Typography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode && EditButton('수정')}
      </Spacing>

      {/* 지도 */}
      <Container>

      </Container>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;