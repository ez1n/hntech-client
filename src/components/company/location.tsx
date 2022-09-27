import React from 'react';
import {Box, Container, Typography, styled} from '@mui/material';

export default function Location() {

  return (
    <TotalBox>
      {/* 소제목 */}
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <TitleTypography variant='h5'>
          찾아오시는 길
        </TitleTypography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing/>

      {/* 지도 */}
      <Container>
        <Typography>
          주소 : 경기도 용인시 처인구 모현읍 외개일로 20번길 9-14
        </Typography>
      </Container>
    </TotalBox>
  )
};

const Spacing = styled(Container)(({theme}) => ({
  height: 50
})) as typeof Container;

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    padding: 10,
  },
  padding: 20,
  paddingBottom: 0
})) as typeof Box;

const TitleTypography = styled(Typography)(({theme}) => ({
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