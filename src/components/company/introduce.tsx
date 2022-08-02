import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Button, Container, styled, Typography } from '@mui/material';

export default function Introduce() {
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
          인사말
        </Typography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode ? <ModifyButton>수정</ModifyButton> : ''}
      </Spacing>

      {/* 내용 */}
      <Container sx={{ textAlign: 'center' }}>
        <Typography>
          화재로부터 "인명", "재산"을 보호하는 소방용 기계기구를 제조, 보급하는 에이치엔테크는
        </Typography>
        <Typography>
          화재안전보국을 기치로 "사람과 기술을 소중히하여 미래로의 연결"이란 창립이념을 바탕으로
        </Typography>
        <Typography>
          항상 안전과 안심을 담보로 세상이 필요로하고 가치를 인정받는 제품으로 사회에 공헌하겠습니다.
        </Typography>
        <Typography>
          - 주식회사 에이치엔테크 임직원 일동 -
        </Typography>
      </Container>
    </Box>
  )
}