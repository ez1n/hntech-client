import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Stack, styled, TextField, Typography } from '@mui/material';
import { openDetail } from '../../app/reducers/questionSlice';

export default function QuestionItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogin = useAppSelector(state => state.question.onLogin);

  // data type
  interface dataType { number: string | number, title: string, status: string, writer: string, date: string }

  // 임시데이터
  const data: dataType[] = [
    { number: '[자주하는 질문]', title: 'XXX 안내', status: '', writer: '관리자', date: '2022-07-23' },
    { number: 3, title: 'ㅇㅇㅇ문의합니다', status: '대기', writer: '전예진', date: '2022-08-05' },
    { number: 2, title: 'ㅇㅇㅇ문의합니다', status: '대기', writer: '배성흥', date: '2022-08-05' },
    { number: 1, title: 'ㅇㅇㅇ문의합니다', status: '답변완료', writer: '이태민', date: '2022-08-03' },
  ];

  // 이름 마스킹
  const masking = (name: string) => {
    if (name === '관리자') {
      return name
    }
    switch (name.length) {
      case 2: return name.replace(name.substring(1,), "*");
      case 3: return name.replace(name.substring(1,), "**");
      default: return name.replace(name.substring(1,), "***");
    }
  };

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
            <List
              onClick={item.writer === '관리자' ? () => navigate('/question-detail') : () => dispatch(openDetail())}
              sx={{
                flex: 0.5,
                cursor: 'pointer',
                '&: hover': {
                  color: 'blue' // 색깔 보류.
                }
              }}>
              {item.title}
            </List>
            <List sx={{ flex: 0.1 }}>{item.status}</List>
            <List sx={{ flex: 0.1 }}>{masking(item.writer)}</List>
            <List sx={{ flex: 0.2 }}>{item.date}</List>
          </Box>
        ))}
      </Box>

      <Spacing />

      <Stack>
        <Pagination count={10} sx={{ m: '0 auto' }} />
      </Stack>

      {/* dialog */}
      <Dialog
        open={onLogin}
        onClose={() => dispatch(openDetail())}
        sx={{ textAlign: 'center' }}>
        <DialogTitle>비밀번호를 입력해 주세요</DialogTitle>
        <DialogContent>
          <TextField type={'password'} size={'small'} inputProps={{ maxLength: 4 }} />
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => {
            dispatch(openDetail());
            navigate('/question-detail');
            // 비밀번호 확인 이벤트 + 틀린경우 에러 메시지
          }}
          >
            확인
          </Button>
          <Button onClick={() => dispatch(openDetail())}>취소</Button>
        </DialogActions>
      </Dialog>
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