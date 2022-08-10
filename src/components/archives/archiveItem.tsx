import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Pagination, Stack, styled, Typography } from '@mui/material';

export default function ArchiveItem() {
  const navigate = useNavigate();

  // data type
  interface dataType { number: number, class: string, title: string, date: string, new: boolean }

  // 임시데이터
  const data: dataType[] = [
    { number: 0, class: '일반자료', title: '제목', date: '2022-08-10', new: true },
    { number: 0, class: '일반자료', title: '제목', date: '2022-08-9', new: true },
    { number: 0, class: '일반자료', title: '제목', date: '2022-08-03', new: false },
    { number: 0, class: '일반자료', title: '제목', date: '2022-07-29', new: false },
    { number: 9, class: '일반자료', title: '제목', date: '2022-08-09', new: true },
    { number: 8, class: '일반자료', title: '제목', date: '2022-08-09', new: true },
    { number: 7, class: '일반자료', title: '제목', date: '2022-08-08', new: true },
    { number: 6, class: '일반자료', title: '제목', date: '2022-08-04', new: false },
    { number: 5, class: '일반자료', title: '제목', date: '2022-08-03', new: false },
    { number: 4, class: '일반자료', title: '제목', date: '2022-08-02', new: false },
    { number: 3, class: '일반자료', title: '제목', date: '2022-07-30', new: false },
    { number: 2, class: '일반자료', title: '제목', date: '2022-07-30', new: false },
    { number: 1, class: '일반자료', title: '제목', date: '2022-07-23', new: false },
  ];

  return (
    <>
      <Box sx={{ borderTop: '3px solid #2E7D32', borderBottom: '3px solid #3B6C46' }}>
        {/* 분류 */}
        <Box sx={{ display: 'flex', flex: 1, p: 2, borderBottom: '3px solid #3B6C46' }}>
          <Title sx={{ flex: 0.1 }}>번호</Title>
          <Title sx={{ flex: 0.1 }}>분류</Title>
          <Title sx={{ flex: 0.6 }}>제목</Title>
          <Title sx={{ flex: 0.2 }}>작성일</Title>
        </Box>

        {/* 목록 */}
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flex: 1,
              p: 1.5,
              borderBottom: '1px solid #3B6C46',
              backgroundColor: `${item.number === 0 && 'rgba(46, 125, 50, 0.1)'}`
            }}>
            <List sx={{ flex: 0.1 }}>{item.number === 0 ? '[공지]' : item.number}</List>
            <List sx={{ flex: 0.1 }}>{item.class}</List>
            <List
              onClick={() => navigate('/archive-detail')}
              sx={{
                flex: 0.6,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                '&: hover': {
                  color: 'blue' // 색깔 보류.
                }
              }}>
              <Typography>
                {item.title}
              </Typography>
              {item.new &&
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: 'small',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'lightseagreen'
                  }}>
                  [new]
                </Typography>
              }
            </List>
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