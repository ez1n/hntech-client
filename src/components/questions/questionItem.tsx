import React from 'react';
import { Box, Container, Pagination, Stack, styled, Typography } from '@mui/material';

export default function QuestionItem() {
  // data type
  interface dataType { number: string | number, title: string, status: string, writer: string, date: string }

  // 임시데이터
  const data: dataType[] = [
    { number: '[자주하는 질문]', title: 'XXX 안내', status: '', writer: '관리자', date: '2022-07-23' },
    { number: 3, title: 'ㅇㅇㅇ문의합니다', status: '대기', writer: '전예진', date: '2022-08-05' },
    { number: 2, title: 'ㅇㅇㅇ문의합니다', status: '대기', writer: '배성흥', date: '2022-08-05' },
    { number: 1, title: 'ㅇㅇㅇ문의합니다', status: '답변완료', writer: '이태민', date: '2022-08-03' },
  ]

  return (
    <>
      <Box sx={{ borderTop: '3px solid #2E7D32', borderBottom: '3px solid #3B6C46' }}>
        {/* 분류 */}
        <Box sx={{ display: 'flex', flex: 1, p: 2, borderBottom: '3px solid #3B6C46' }}>
          <Title sx={{ flex: 0.1 }}>번호</Title>
          <Title sx={{ flex: 0.5 }}>제목</Title>
          <Title sx={{ flex: 0.1 }}>처리상태</Title>
          <Title sx={{ flex: 0.1 }}>작성자</Title>
          <Title sx={{ flex: 0.2 }}>작성일</Title>
        </Box>

        {/* 목록 */}
        {data.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flex: 1, p: 1.5, borderBottom: '1px solid #3B6C46', backgroundColor: `${item.number === '[자주하는 질문]' && 'rgba(46, 125, 50, 0.1)'}` }}>
            <List sx={{ flex: 0.1 }}>{item.number}</List>
            <List sx={{ flex: 0.5 }}>{item.title}</List>
            <List sx={{ flex: 0.1 }}>{item.status}</List>
            <List sx={{ flex: 0.1 }}>{item.writer}</List>
            <List sx={{ flex: 0.2 }}>{item.date}</List>
          </Box>
        ))}
      </Box>

      <Spacing />

      <Stack>
        <Pagination count={10} sx={{ m: '0 auto' }} />
      </Stack>
    </>
  )
};


const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;

const Title = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;

const List = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: 15,
})) as typeof Typography;