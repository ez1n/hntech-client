import React, {useEffect, useState} from 'react';
import {questionApi} from '../../network/question';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {setCurrentId, setDetailData, setFaqState} from '../../app/reducers/questionSlice';
import {getAllQuestions, setPassword, inputPassword, getFaq} from '../../app/reducers/questionSlice';
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
  TextField,
  Typography,
  styled
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function QuestionItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {currentPage} = useParams();
  let page = currentPage ? parseInt(currentPage) : 1;

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const passwordState = useAppSelector(state => state.question.passwordState); // 비밀번호 dialog state
  const pw = useAppSelector(state => state.question.pw); // 비밀번호 state (정보)
  const questions = useAppSelector(state => state.question.questions); // 문의 목록 state
  const totalPage = useAppSelector(state => state.question.totalPage); // 전체 페이지 state
  const totalElements = useAppSelector(state => state.question.totalElements);
  const faq = useAppSelector(state => state.question.faq); // FAQ 목록 state
  const currentId = useAppSelector(state => state.question.currentId); // 선택한 게시글 id state
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  // 자주하는 질문 목록 받아오기
  useEffect(() => {
    questionApi.getFAQ()
      .then(res => dispatch(getFaq({faq: res.questions})))
      .catch(error => console.log('faq error', error))

    localStorage.removeItem('qnaPassword');
  }, []);

  // 문의 목록 받아오기
  useEffect(() => {
    questionApi.getAllQuestions(page - 1)
      .then(res => dispatch(getAllQuestions({
        questions: res.questions,
        totalPage: res.totalPages,
        currentPage: res.currentPage,
        totalElements: res.totalElements
      })))
      .catch(error => console.log('error', error))
  }, [currentPage]);

  const validate = () => {
    let isValid = true;
    if (pw.password.length !== 4) {
      setPasswordErrorMsg('비밀번호를 확인해 주세요.');
      isValid = false;
    } else setPasswordErrorMsg('');
    return isValid;
  };

  // 이름 마스킹
  const masking = (name: string) => {
    if (name === '관리자') {
      return name;
    }
    switch (name.length) {
      case 2:
        return name.replace(name.substring(1,), "*");
      case 3:
        return name.replace(name.substring(1,), "**");
      default:
        return name.replace(name.substring(1,), "***");
    }
  };

  // 비밀번호 입력
  const openDetail = (id: number) => {
    if (validate()) {
      questionApi.postPassword(id, pw)
        .then(res => {
          dispatch(inputPassword());
          dispatch(setDetailData({detail: res}));
          localStorage.setItem('qnaPassword', pw.password);
          dispatch(setPassword({password: ''}));
          navigate('/question/page/' + page + '/list/' + res.id);
        })
        .catch(error => setPasswordErrorMsg('비밀번호를 확인해 주세요'))
    }
  };

  const onOpenDetailKeyUp = (event: any, id: number) => {
    if (event.key === 'Enter') {
      openDetail(id)
    }
  };

  // 게시글 자세히 보기
  const getQuestionByAdmin = (questionId: number) => {
    if (managerMode) {
      questionApi.getQuestionByAdmin(questionId)
        .then(res => {
          dispatch(setDetailData({detail: res}));
          dispatch(setFaqState({faq: false}));
          navigate('/question/page/' + page + '/list/' + res.id);
        })
    } else {
      dispatch(inputPassword());
      dispatch(setCurrentId({id: questionId}));
    }
  };

  // FAQ 상세보기
  const getFAQDetail = (questionId: number) => {
    questionApi.getFAQDetail(questionId)
      .then(res => {
        dispatch(setDetailData({detail: res}));
        dispatch(setFaqState({faq: true}));
        navigate('/question/page/' + page + '/list/' + res.id);
      })
      .catch(error => console.log(error))
  };

  // 페이지 전환
  const changePage = (value: number) => {navigate('/question/page/' + value)};

  return (
    <>
      <Box sx={{borderTop: '3px solid #2E7D32', borderBottom: '3px solid #3B6C46'}}>
        {/* 분류 */}
        <Box sx={{display: 'flex', flex: 1, p: 2, borderBottom: '3px solid #3B6C46'}}>
          <Title sx={{flex: 0.1}}>번호</Title>
          <Title sx={{flex: 0.5}}>제목</Title>
          <Title sx={{flex: 0.1}}>처리상태</Title>
          <Title sx={{flex: 0.1}}>작성자</Title>
          <Title sx={{flex: 0.2}}>작성일</Title>
        </Box>

        {/* FAQ */}
        {faq.map((item) => (
          <Box key={item.id} sx={{
            display: 'flex',
            flex: 1,
            p: 1.5,
            borderBottom: '1px solid #3B6C46',
            backgroundColor: 'rgba(105,162,149,0.1)'
          }}>
            <List sx={{flex: 0.1}}>
              <Icon/>
            </List>
            <TitleList onClick={() => getFAQDetail(item.id)}>
              <List sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.title}
              </List>
              {item.new == 'true' &&
                <New>[new]</New>
              }
            </TitleList>
            <List sx={{flex: 0.1}}>{item.status}</List>
            <List sx={{flex: 0.1}}>{masking(item.writer)}</List>
            <List sx={{flex: 0.2}}>{item.createTime}</List>
          </Box>
        ))}

        {/* 목록 */}
        {questions.map((item, index: number) => (
          <Box key={item.id} sx={{display: 'flex', flex: 1, p: 1.5, borderBottom: '1px solid #3B6C46'}}>
            <List sx={{flex: 0.1}}>{totalElements - 15 * (page - 1) - index}</List>
            <TitleList onClick={() => getQuestionByAdmin(item.id)}>
              <List sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.title}
              </List>
              {item.new == 'true' &&
                <New>[new]</New>
              }
            </TitleList>
            <List sx={{flex: 0.1}}>{item.status}</List>
            <List sx={{flex: 0.1}}>{masking(item.writer)}</List>
            <List sx={{flex: 0.2}}>{item.createTime}</List>
          </Box>
        ))}
      </Box>

      <Spacing/>

      <Stack>
        <Pagination
          onChange={(event: React.ChangeEvent<unknown>, value: number) => changePage(value)}
          count={totalPage}
          page={page}
          sx={{m: '0 auto'}}/>
      </Stack>

      {/* dialog */}
      {!managerMode &&
        <Dialog
          open={passwordState}
          onClose={() => dispatch(inputPassword())}
          sx={{textAlign: 'center'}}>
          <DialogTitle>비밀번호를 입력해 주세요</DialogTitle>
          <DialogContent>
            <TextField
              type={'password'}
              size={'small'}
              error={!!passwordErrorMsg}
              helperText={passwordErrorMsg}
              inputProps={{maxLength: 4}}
              onChange={event => dispatch(setPassword({password: event.target.value}))}
              onKeyUp={event => onOpenDetailKeyUp(event, currentId)}/>
          </DialogContent>

          <DialogActions sx={{justifyContent: 'center'}}>
            <Button onClick={() => openDetail(currentId)}>
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

const Title = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 17,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;

const List = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 13,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 11,
  },
  textAlign: 'center',
  alignItems: 'center',
  fontSize: 15
})) as typeof Box;

const TitleList = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 13,
    minWidth: '265px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 11,
    minWidth: '155px'
  },
  textAlign: 'center',
  alignItems: 'center',
  fontSize: 15,
  flex: 0.5,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  minWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&: hover': {
    color: 'blue'
  }
})) as typeof Box;

const New = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 10,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 8,
  },
  marginLeft: 7,
  fontSize: 13,
  display: 'flex',
  color: 'lightseagreen'
})) as typeof Typography;

const Icon = styled(ErrorIcon)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 17,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
  color: 'darkgreen'
}));