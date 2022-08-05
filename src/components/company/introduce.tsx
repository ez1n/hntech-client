import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';

export default function Introduce() {
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  // 임시
  const comment = `화재로부터 "인명", "재산"을 보호하는 소방용 기계기구를 제조, 보급하는 에이치엔테크는
    화재안전보국을 기치로 "사람과 기술을 소중히하여 미래로의 연결"이란 창립이념을 바탕으로
    항상 안전과 안심을 담보로 세상이 필요로하고 가치를 인정받는 제품으로 사회에 공헌하겠습니다.`

  return (
    <Box sx={{ p: 5 }}>
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
        {managerMode && EditButton('수정', console.log('#'))}
      </Spacing>

      {/* 내용 */}
      <Container>
        {comment.split('\n').map((value, index) => (
          <Typography sx={{
            fontSize: 18,
            mb: 3,
            textAlign: 'center'
          }}
            key={index}>
            {value}
          </Typography>
        ))}

        <Typography sx={{ fontSize: 18, mt: 10, textAlign: 'center' }}>
          - 주식회사 에이치엔테크 임직원 일동 -
        </Typography>

      </Container>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;