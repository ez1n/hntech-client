import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Container, styled } from '@mui/material';
import EditButton from '../editButton';

export default function Specification() {
  const managerMode = useAppSelector(state => state.manager.managerMode);

  return (
    <Container>
      {/* 수정 버튼 */}
      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode && EditButton('이미지 수정', () => console.log('#'))}
      </Spacing>

      {/* 상세정보 이미지 */}
      <Box>
        상세정보
      </Box>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;