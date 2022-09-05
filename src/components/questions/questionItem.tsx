import React, { useEffect } from 'react';
import { questionApi } from '../../network/question';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentId, setDetailData, setFaqState } from '../../app/reducers/questionSlice';
import { getAllQuestions, setPassword, inputPassword, getFaq } from '../../app/reducers/questionSlice';
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
import ErrorIcon from '@mui/icons-material/Error';

export default function QuestionItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const passwordState = useAppSelector(state => state.question.passwordState); // 비밀번호 dialog state
  const pw = useAppSelector(state => state.question.pw); // 비밀번호 state (정보)
  const questions = useAppSelector(state => state.question.questions); // 문의 목록 state
  const totalPage = useAppSelector(state => state.question.totalPage); // 전체 페이지 state
  const currentPage = useAppSelector(state => state.question.currentPage); // 현재 페이지 state
  const faq = useAppSelector(state => state.question.faq); // FAQ 목록 state
  const currentId = useAppSelector(state => state.question.currentId); // 선택한 게시글 id state

  useEffect(() => {
    // 자주하는 질문 목록 받아오기
    questionApi.getFAQ()
      .then(res => dispatch(getFaq({ faq: res.questions })))
      .catch(error => console.log('faq error', error))
    // 문의 목록 받아오기
    questionApi.getAllQuestions(0)
      .then(res => dispatch(getAllQuestions({ questions: res.questions, totalPage: res.totalPage, currentPage: res.currentPage })))
      .catch(error => console.log('error', error))
  }, []);

  // 이름 마스킹
  const masking = (name: string) => {
    if (name === '관리자') {
      return name;
    }
    switch (name.length) {
      case 2: return name.replace(name.substring(1,), "*");
      case 3: return name.replace(name.substring(1,), "**");
      default: return name.replace(name.substring(1,), "***");
    }
  };

  // 비밀번호 입력
  const openDetail = (id: number) => {
    questionApi.postPassword(id, pw)
      .then(res => {
        dispatch(inputPassword());
        dispatch(setDetailData({ detail: res }));
        navigate('/question-detail');
      })
  };

  // 게시글 자세히 보기
  const getQuestionByAdmin = (questionId: number) => {
    if (managerMode) {
      questionApi.getQuestionByAdmin(questionId)
        .then(res => {
          dispatch(setDetailData({ detail: res }));
          dispatch(setFaqState({ faq: false }));
          navigate('/question-detail');
        })
    } else {
      dispatch(inputPassword());
      dispatch(setCurrentId({ id: questionId }));
    }
  };

  // FAQ 상세보기
  const getFAQDetail = (questionId: number) => {
    questionApi.getFAQDetail(questionId)
      .then(res => {
        dispatch(setDetailData({ detail: res }));
        dispatch(setFaqState({ faq: true }));
        navigate('/question-detail');
      })
      .catch(error => console.log(error))
  };

  // 페이지 전환
  const changePage = (value: number) => {
    questionApi.getAllQuestions(value - 1)
      .then(res => dispatch(getAllQuestions({ questions: res.questions, totalPage: res.totalPage, currentPage: res.currentPage })))
      .catch(error => console.log(error))
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
        {faq.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', flex: 1, p: 1.5, borderBottom: '1px solid #3B6C46', backgroundColor: 'rgba(46, 125, 50, 0.1)' }}>
            <List sx={{ flex: 0.1 }}><ErrorIcon sx={{ color: 'darkgreen' }} /></List>
            <List
              onClick={() => getFAQDetail(item.id)}
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
        {questions.map((item) => (
          <>
            <Box key={item.id} sx={{ display: 'flex', flex: 1, p: 1.5, borderBottom: '1px solid #3B6C46' }}>
              <List sx={{ flex: 0.1 }}>{item.id}</List>
              <List
                onClick={() => getQuestionByAdmin(item.id)}
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
          </>
        ))}
      </Box>

      <Spacing />

      <Stack>
        <Pagination
          count={totalPage}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => changePage(value)}
          sx={{ m: '0 auto' }} />
      </Stack>

      {/* dialog */}
      {!managerMode &&
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
            <Button onClick={() => { openDetail(currentId) }}>
              확인
            </Button>
            <Button onClick={() => dispatch(inputPassword())}>취소</Button>
          </DialogActions>
        </Dialog>
      }
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