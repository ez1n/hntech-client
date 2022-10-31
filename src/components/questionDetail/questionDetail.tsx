import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {questionApi} from '../../network/question';
import {commentApi} from '../../network/comment';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clickCommentRemoveGoBack} from '../../app/reducers/dialogSlice';
import {setDetailData, updateCommentData} from '../../app/reducers/questionSlice';
import {setCurrentQuestion} from '../../app/reducers/questionFormSlice';
import {changeMode} from '../../app/reducers/managerModeSlice';
import {resetAnchor} from '../../app/reducers/commentSlice';
import {Box, Button, Container, styled, Typography} from '@mui/material';
import EditButton from '../editButton';
import QuestionContent from './questionContent';
import Comment from './comment';
import CommentForm from './commentForm';
import CancelModal from '../cancelModal';

interface propsType {
  successAnswer: () => void,
  successDelete: () => void
}

export default function QuestionDetail({successAnswer, successDelete}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {index} = useParams();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const faqState = useAppSelector(state => state.question.faqState); // FAQ
  const detail = useAppSelector(state => state.question.detail); // 게시글 정보
  const commentRemoveState = useAppSelector(state => state.dialog.commentRemoveState); // 댓글 삭제
  const currentComment = useAppSelector(state => state.comment.currentComment); // 현재 댓글 정보
  const [deleteQuestionDetail, setDeleteQuestionDetail] = useState(false); // 게시글 삭제 취소
  const [onCompleteAnswer, setOnCompleteAnswer] = useState(false); // 게시글 답변 상태 변경

  // 수정 데이터 업데이트
  useEffect(() => {
    dispatch(setCurrentQuestion({question: {content: detail.content, title: detail.title, files: detail.files}}));
  }, []);

  useEffect(() => {
    const mode = localStorage.getItem('login')
    if (index && mode === 'true') {
      questionApi.getQuestionByAdmin(parseInt(index))
        .then(res => dispatch(setDetailData({detail: res})))
    }
    else if (index) {
      const password = localStorage.getItem('qnaPassword')
      questionApi.postPassword(parseInt(index), {password: password})
        .then(res => dispatch(setDetailData({detail: res})))
    }
  }, [managerMode]);

  // 게시글 삭제 modal - open
  const openDeleteQuestionDetail = () => {
    setDeleteQuestionDetail(deleteQuestionDetail => !deleteQuestionDetail);
  };

  // 게시글 삭제 modal - close
  const closeDeleteQuestionDetail = () => {
    setDeleteQuestionDetail(false);
  };

  // 답변 상태 변경 modal - open
  const openCompleteAnswer = () => {
    setOnCompleteAnswer(openCompleteAnswer => !openCompleteAnswer);
  };

  // 답변 상태 변경 modal - close
  const closeCompleteAnswer = () => {
    setOnCompleteAnswer(false);
  };

  // 게시글 삭제 요청
  const deleteQuestion = (id: number) => {
    questionApi.deleteQuestion(id)
      .then(res => {
        successDelete();
        closeDeleteQuestionDetail();
        navigate('/question?page=1');
      });
  };

  // 게시글 처리 완료 요청
  const putUpdateQuestionStatus = (questionId: number) => {
    managerMode &&
    questionApi.putUpdateQuestionStatus(questionId)
      .then(res => {
        successAnswer();
        dispatch(setDetailData({detail: res}));
        closeCompleteAnswer();
      });
  };

  // 댓글 삭제
  const deleteComment = (questionId: number, commentId: number) => {
    commentApi.deleteComment(questionId, commentId)
      .then(res => {
        dispatch(updateCommentData({comments: res.comments}));
        dispatch(clickCommentRemoveGoBack());
        dispatch(resetAnchor());
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  const ModifyButtons = (faqState: string) => {
    if (faqState === 'true') {
      return (
        managerMode &&
        <>
            <EditButton name='수정' onClick={() => navigate('/question/modify')}/>
            <EditButton name='삭제' onClick={openDeleteQuestionDetail}/>
        </>
      )
    } else {
      return (
        <>
          <EditButton name='수정' onClick={() => navigate('/question/modify')}/>
          <EditButton name='삭제' onClick={openDeleteQuestionDetail}/>
        </>
      )
    }
  }

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>
        문의사항
      </Title>

      {/* 버튼 */}
      <Spacing sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <>
          {managerMode &&
              <AnswerButton onClick={openCompleteAnswer} disabled={detail.status === '완료'}>
                  답변완료
              </AnswerButton>}

          {ModifyButtons(faqState)}
        </>
      </Spacing>


      {/* 문의 내용 */}
      <QuestionContent/>

      {/* 목록 버튼 */}
      <Box sx={{mt: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          size='small'
          onClick={() => navigate('/question?page=1')}
          sx={{
            color: 'white',
            backgroundColor: '#2E7D32',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#339933'
            }
          }}>
          목록
        </Button>
      </Box>

      <Spacing sx={{display: 'flex', alignItems: 'center'}}>
        <Typography variant='h6'>
          댓글
        </Typography>
      </Spacing>

      {/* 댓글 */}
      {detail.comments.map((item) => (
        <Comment key={item.id} item={item} questionId={detail.id}/>
      ))}

      <Spacing/>

      {/* 댓글 폼 */}
      {detail.status !== '완료' && <CommentForm id={detail.id}/>}

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={deleteQuestionDetail}
        title={'게시글 삭제'}
        text1={'삭제된 게시글은 복구할 수 없습니다'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteQuestion(detail.id)}
        closeAction={closeDeleteQuestionDetail}/>

      {/* 답변완료 Dialog */}
      <CancelModal
        openState={onCompleteAnswer}
        title={'문의사항 처리상태 변경'}
        text1={'답변 완료된 게시글은 되돌릴 수 없습니다.'}
        text2={'변경 하시겠습니까?'}
        yesAction={() => putUpdateQuestionStatus(detail.id)}
        closeAction={closeCompleteAnswer}/>

      {/* 댓글 삭제 Dialog */}
      <CancelModal
        openState={commentRemoveState}
        title={'댓글 삭제'}
        text1={'삭제된 댓글은 복구할 수 없습니다.'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteComment(detail.id, currentComment.id !== null ? currentComment.id : 0)}
        closeAction={() => dispatch(clickCommentRemoveGoBack())}/>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;

const AnswerButton = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 12,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 10,
  },
  margin: 10,
  color: '#2E7D32',
  border: '1px solid rgba(46, 125, 50, 0.5)',
  borderRadius: 10,
  backgroundColor: 'rgba(46, 125, 50, 0.1)'

})) as typeof Button;

const Title = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;