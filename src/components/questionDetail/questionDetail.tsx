import React, { useEffect } from 'react';
import { questionApi } from '../../network/question';
import { commentApi } from '../../network/comment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { clickCommentRemoveGoBack, clickQuestionDetailGoBack, clickQuestionStatusGoBack } from '../../app/reducers/dialogSlice';
import { setDetailData, updateCommentData } from '../../app/reducers/questionSlice';
import { setCurrentQuestion } from '../../app/reducers/questionFormSlice';
import { resetAnchor } from '../../app/reducers/commentSlice';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import QuestionContent from './questionContent';
import Comment from './comment';
import CommentForm from './commentForm';
import CancelModal from '../cancelModal';
import { changeMode } from '../../app/reducers/managerModeSlice';

interface propsType {
  successAnswer: () => void,
  successDelete: () => void
}

export default function QuestionDetail({ successAnswer, successDelete }: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const faqState = useAppSelector(state => state.question.faqState); // FAQ state
  const questionDetailState = useAppSelector(state => state.dialog.questionDetailState); // 게시글 삭제 취소 state
  const questionStatusState = useAppSelector(state => state.dialog.questionStatusState); // 게시글 상태 변경 취소 state
  const detail = useAppSelector(state => state.question.detail); // 게시글 정보 state
  const commentRemoveState = useAppSelector(state => state.dialog.commentRemoveState); // 댓글 삭제 state
  const currentComment = useAppSelector(state => state.comment.currentComment); // 현재 댓글 정보

  // 수정 데이터 업데이트
  useEffect(() => {
    dispatch(setCurrentQuestion({ content: detail.content, title: detail.title }));
  }, []);

  // 게시글 삭제 요청
  const deleteQuestion = (id: number) => {
    questionApi.deleteQuestion(id)
      .then(res => {
        successDelete();
        dispatch(clickQuestionDetailGoBack());
        navigate('/question');
      });
  };

  // 게시글 처리 완료 요청
  const putUpdateQuestionStatus = (questionId: number) => {
    managerMode &&
      questionApi.putUpdateQuestionStatus(questionId)
        .then(res => {
          successAnswer();
          dispatch(setDetailData({ detail: res }));
          dispatch(clickQuestionStatusGoBack());
        });
  };

  // 댓글 삭제
  const deleteComment = (questionId: number, commentId: number) => {
    commentApi.deleteComment(questionId, commentId)
      .then(res => {
        dispatch(updateCommentData({ comments: res.comments }));
        dispatch(clickCommentRemoveGoBack());
        dispatch(resetAnchor());
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({ login: isLogin }));
        };
      })
  };

  const ModifyButtons = (faqState: string) => {
    if (faqState === 'true') {
      return (
        managerMode &&
        <>
          <EditButton name='수정' onClick={() => navigate('/question-modify')} />
          <EditButton name='삭제' onClick={() => dispatch(clickQuestionDetailGoBack())} />
        </>
      )
    } else {
      return (
        <>
          <EditButton name='수정' onClick={() => navigate('/question-modify')} />
          <EditButton name='삭제' onClick={() => dispatch(clickQuestionDetailGoBack())} />
        </>
      )
    }
  }

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Title variant='h5'>
        문의사항
      </Title>

      {/* 버튼 */}
      <Spacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <>
          {managerMode &&
            <AnswerButton
              onClick={() => dispatch(clickQuestionStatusGoBack())}
              disabled={detail.status === '완료' ? true : false}
            >
              답변완료
            </AnswerButton>}

          {ModifyButtons(faqState)}
        </>
      </Spacing>


      {/* 문의 내용 */}
      <QuestionContent />

      {/* 목록 버튼 */}
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          size='small'
          onClick={() => navigate('/question')}
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

      <Spacing sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h6'>
          댓글
        </Typography>
      </Spacing>

      {/* 댓글 */}
      {detail.comments.map((item) => (
        <Comment key={item.id} item={item} questionId={detail.id} />
      ))}

      <Spacing />

      {/* 댓글 폼 */}
      {detail.status !== '완료' && <CommentForm id={detail.id} />}

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={questionDetailState}
        title={'게시글 삭제'}
        text1={'삭제된 게시글은 복구할 수 없습니다'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteQuestion(detail.id)}
        closeAction={() => dispatch(clickQuestionDetailGoBack())} />

      {/* 답변완료 Dialog */}
      <CancelModal
        openState={questionStatusState}
        title={'문의사항 처리상태 변경'}
        text1={'답변 완료된 게시글은 되돌릴 수 없습니다.'}
        text2={'변경 하시겠습니까?'}
        yesAction={() => putUpdateQuestionStatus(detail.id)}
        closeAction={() => dispatch(clickQuestionStatusGoBack())} />

      {/* 댓글 삭제 Dialog */}
      <CancelModal
        openState={commentRemoveState}
        title={'댓글 삭제'}
        text1={'삭제된 댓글은 복구할 수 없습니다.'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteComment(detail.id, currentComment.id !== null ? currentComment.id : 0)}
        closeAction={() => dispatch(clickCommentRemoveGoBack())} />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;

const AnswerButton = styled(Button)(({ theme }) => ({
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

const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;