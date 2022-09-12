import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';

export default function Location() {
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

  return (
    <TotalBox>
      {/* 소제목 */}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <TitleTypography variant='h5'>
          찾아오시는 길
        </TitleTypography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode && <EditButton name='수정' onClick={() => console.log('#')} />}
      </Spacing>

      {/* 지도 */}
      <Container>

      </Container>
    </TotalBox>
  )
};

const Spacing = styled(Container)(({ theme }) => ({
  height: 50
})) as typeof Container;

const TotalBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: 10,
  },
  padding: 20,
  paddingBottom: 0
})) as typeof Box;

const TitleTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32',
})) as typeof Typography;