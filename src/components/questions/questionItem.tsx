import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import {
  getAllQuestions,
  setPassword,
  inputPassword,
  getFaq
} from '../../app/reducers/questionSlice';
import { setDetailData } from '../../app/reducers/questionSlice';
import ErrorIcon from '@mui/icons-material/Error';

export default function QuestionItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const passwordState = useAppSelector(state => state.question.passwordState); // 비밀번호 dialog state
  const pw = useAppSelector(state => state.question.pw); // 비밀번호 state (정보)
  const questions = useAppSelector(state => state.question.questions); // 문의 목록 state
  const totalPage = useAppSelector(state => state.question.totalPage); // 전체 페이지 state
  const currentPage = useAppSelector(state => state.question.currentPage); // 현재 페이지 state
  const faq = useAppSelector(state => state.question.faq); // FAQ 목록 state

  useEffect(() => {
    // 문의 목록 받아오기
    api.getAllQuestions(0)
      .then(res => dispatch(getAllQuestions({ questions: res.questions, totalPage: res.totalPage, currentPage: res.currentPage })));

    // 자주하는 질문 목록 받아오기
    api.getFAQ()
      .then(res => { dispatch(getFaq({ faq: res.questions })) });
  }, [])

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

  // 비밀번호 입력
  const openDetail = (id: number) => {
    api.postPassword(id, pw)
      .then(res => {
        dispatch(inputPassword());
        dispatch(setDetailData(res));
        navigate('/question-detail');
      })
  };

  // 페이지 전환
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    api.getAllQuestions(value)
      .then(res => dispatch(getAllQuestions({ questions: res.questions, totalPage: res.totalPage, currentPage: res.currentPage })));
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

        {/* FAQ */}
        {faq.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flex: 1, p: 1.5, borderBottom: '1px solid #3B6C46', backgroundColor: 'rgba(46, 125, 50, 0.1)' }}>
            <List sx={{ flex: 0.1 }}><ErrorIcon sx={{ color: 'darkgreen' }} /></List>
            <List
              onClick={() => navigate('/question-detail')}
              sx={{
                flex: 0.5,
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                '&: hover': {
                  color: 'blue'
                }
              }}>
              <Typography>
                {item.title}
              </Typography>
              {item.new == 'true' &&
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
            <List sx={{ flex: 0.1 }}>{item.status}</List>
            <List sx={{ flex: 0.1 }}>{masking(item.writer)}</List>
            <List sx={{ flex: 0.2 }}>{item.createTime}</List>
          </Box>
        ))}

        {/* 목록 */}
        {questions.map((item, index) => (
          <>
            <Box key={index} sx={{ display: 'flex', flex: 1, p: 1.5, borderBottom: '1px solid #3B6C46' }}>
              <List sx={{ flex: 0.1 }}>{item.id}</List>
              <List
                onClick={() => dispatch(inputPassword())}
                sx={{
                  flex: 0.5,
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '&: hover': {
                    color: 'blue'
                  }
                }}>
                <Typography>
                  {item.title}
                </Typography>
                {item.new == 'true' &&
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
              <List sx={{ flex: 0.1 }}>{item.status}</List>
              <List sx={{ flex: 0.1 }}>{masking(item.writer)}</List>
              <List sx={{ flex: 0.2 }}>{item.createTime}</List>
            </Box>

            {/* dialog */}
            <Dialog
              open={passwordState}
              onClose={() => dispatch(inputPassword())}
              sx={{ textAlign: 'center' }}>
              <DialogTitle>비밀번호를 입력해 주세요</DialogTitle>
              <DialogContent>
                <TextField
                  type={'password'}
                  size={'small'}
                  inputProps={{ maxLength: 4 }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch(setPassword({ password: event.target.value }))} />
              </DialogContent>

              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={() => { openDetail(item.id) }}>
                  확인
                </Button>
                <Button onClick={() => dispatch(inputPassword())}>취소</Button>
              </DialogActions>
            </Dialog>
          </>
        ))}
      </Box>

      <Spacing />

      <Stack>
        <Pagination
          count={totalPage}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => changePage(event, value)}
          sx={{ m: '0 auto' }} />
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
  fontSize: 15
})) as typeof Typography;