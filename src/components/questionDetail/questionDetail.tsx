import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {questionApi} from '../../network/question';
import {commentApi} from '../../network/comment';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setDetailData, updateCommentData} from '../../app/reducers/questionSlice';
import {changeMode} from '../../app/reducers/adminSlice';
import {resetAnchor} from '../../app/reducers/commentSlice';
import {Box, Button, Container, styled, Typography} from '@mui/material';
import EditButton from '../editButton';
import QuestionContent from './questionContent';
import Comment from './comment';
import CommentForm from './commentForm';
import CancelModal from '../cancelModal';
import {onLoading} from "../../app/reducers/dialogSlice";

interface propsType {
  successAnswer: () => void,
  successDelete: () => void,
  errorToast: (message: string) => void
}

export default function QuestionDetail({successAnswer, successDelete, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {index} = useParams();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const faqState = useAppSelector(state => state.question.faqState); // FAQ
  const detail = useAppSelector(state => state.question.detail); // 게시글 정보
  const currentComment = useAppSelector(state => state.comment.currentComment); // 현재 댓글 정보
  const [commentOpen, setCommentOpen] = useState(false);
  const [deleteQuestionDetail, setDeleteQuestionDetail] = useState(false); // 게시글 삭제 취소
  const [onCompleteAnswer, setOnCompleteAnswer] = useState(false); // 게시글 답변 상태 변경

  useEffect(() => {
    const mode = localStorage.getItem('login');

    if (index && mode === 'true') {
      questionApi.getQuestionByAdmin(parseInt(index))
        .then(res => dispatch(setDetailData({detail: res})))
        .catch(error => console.log(error))
    } else if (index) {
      const password = localStorage.getItem('qnaPassword')
      questionApi.postPassword(parseInt(index), {password: password})
        .then(res => dispatch(setDetailData({detail: res})))
        .catch(error => console.log(error))
    }
  }, [managerMode]);

  // 게시글 삭제 modal
  const openDeleteQuestionDetail = () => setDeleteQuestionDetail(prev => !prev);

  // 게시글 삭제 modal - close
  const closeDeleteQuestionDetail = () => setDeleteQuestionDetail(false);

  // 답변 상태 변경 modal
  const openCompleteAnswer = () => setOnCompleteAnswer(prev => !prev);

  // 답변 상태 변경 modal - close
  const closeCompleteAnswer = () => setOnCompleteAnswer(false);

  // 댓글 삭제 modal
  const deleteCommentModal = () => setCommentOpen(prev => !prev);

  // 게시글 삭제 요청
  const deleteQuestion = (id: number) => {
    dispatch(onLoading());
    questionApi.deleteQuestion(id)
      .then(() => {
        successDelete();
        closeDeleteQuestionDetail();
        navigate('/question?page=1');
      })
      .catch(error => {
        errorToast('게시글을 삭제할 수 없습니다.');
        console.log(error);
      })
      .finally(() => dispatch(onLoading()))
  };

  // 게시글 처리 완료 요청
  const putUpdateQuestionStatus = (questionId: number) => {
    managerMode &&
    questionApi.putUpdateQuestionStatus(questionId)
      .then(res => {
        successAnswer();
        dispatch(setDetailData({detail: res}));
        closeCompleteAnswer();
      })
      .catch(error => {
        errorToast('답변완료 처리할 수 없습니다.');
        console.log(error);
      });
  };

  // 댓글 삭제
  const deleteComment = (questionId: number, commentId: number) => {
    dispatch(onLoading());
    commentApi.deleteComment(questionId, commentId)
      .then(res => {
        successDelete();
        dispatch(updateCommentData({comments: res.comments}));
        dispatch(resetAnchor());
        deleteCommentModal();
      })
      .catch(error => {
        console.log(error);
        errorToast('댓글을 삭제할 수 없습니다.');

        if (error.response.status === 401) {
          errorToast('로그인이 필요합니다.');
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
      .finally(() => dispatch(onLoading()))
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
        <Comment key={item.id} item={item} questionId={detail.id} onClose={deleteCommentModal}/>
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
        openState={commentOpen}
        title={'댓글 삭제'}
        text1={'삭제된 댓글은 복구할 수 없습니다.'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteComment(detail.id, currentComment.id !== null ? currentComment.id : 0)}
        closeAction={deleteCommentModal}/>
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