import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';

export default function OrgChart() {
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

  // 임시
  const image = '/images/organizationChart.png';

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
        {managerMode && EditButton('수정')}
      </Spacing>

      {/* 조직도 */}
      <Box sx={{ textAlign: 'center' }}>
        <img className='orgChartImage' src={image} />
      </Box>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;