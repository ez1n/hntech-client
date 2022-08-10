import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Container, styled } from '@mui/material';

export default function Specification() {
  const managerMode = useAppSelector(state => state.manager.managerMode);

  return (
    <Container>
      <Box>
        상세정보
      </Box>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;