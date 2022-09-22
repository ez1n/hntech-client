import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Container, Typography, styled} from '@mui/material';
import EditButton from '../editButton';
import QuestionItem from './questionItem';

export default function Questions() {
  const navigate = useNavigate();

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <TitleTypography variant='h5'>
        문의사항
      </TitleTypography>

      {/* 버튼 */}
      <Box sx={{textAlign: 'end'}}>
        <EditButton name='글쓰기' onClick={() => navigate('/question-form')}/>
      </Box>

      {/* 문의 목록 */}
      <QuestionItem/>
    </Container>
  )
};

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32'
})) as typeof Typography;