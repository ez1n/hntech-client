import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Button, Container, styled, Typography } from '@mui/material';

export default function OrgChart() {
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

  const Spacing = styled(Container)(() => ({
    height: 50
  })) as typeof Container;

  // 정보 수정 버튼
  const ModifyButton = styled(Button)(() => ({
    color: '#2E7D32',
    border: '1px solid rgba(46, 125, 50, 0.5)',
    borderRadius: 10,
    backgroundColor: 'rgba(46, 125, 50, 0.1)'
  })) as typeof Button;

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
          조직도
        </Typography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode ? <ModifyButton>수정</ModifyButton> : ''}
      </Spacing>

      {/* 조직도 삽입 */}
      <Container>

      </Container>
    </Box>
  )
}
