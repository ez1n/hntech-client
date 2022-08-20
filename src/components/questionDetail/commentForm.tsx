import React, { useRef } from 'react';
import { api } from '../../network/network';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setComment } from '../../app/reducers/commentSlice';
import { clickCommentGoBack } from '../../app/reducers/dialogSlice';
import { updateCommentData } from '../../app/reducers/questionSlice';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import CancelModal from '../cancelModal';

interface propsType {
  id: number
}

export default function CommentForm({ id }: propsType) {
  const dispatch = useAppDispatch();

  const commentRef: React.Ref<any> = useRef();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const commentState = useAppSelector(state => state.dialog.commentState); // 댓글 입력 취소  state
  const comment = useAppSelector(state => state.comment.comment); // 댓글 state

  // 댓글 등록
  const postComment = () => {
    api.postCreateComment(id, comment)
      .then(res => {
        dispatch(updateCommentData({ comments: res.comments }));
        dispatch(clickCommentGoBack());
        commentRef.current.value = '';
      })
      .catch(error => console.log(error))
  };

  return (
    <Stack direction='column' sx={{ alignItems: 'center' }}>
      <TextField
        onChange={event => dispatch(setComment({ comment: event.target.value, writer: managerMode ? '관리자' : '작성자' }))}
        inputRef={commentRef}
        multiline
        minRows={3}
        variant={'filled'}
        label={'댓글 작성'}
        inputProps={{ maxLength: 50 }}
        sx={{ width: '100%' }} />

      <Box sx={{ width: '100%', textAlign: 'end' }}>
        <Button
          onClick={() => { dispatch(clickCommentGoBack()) }}
          sx={{ fontSize: 16, color: 'green' }}>
          등록
        </Button>
      </Box>

      {/* 댓글 등록 Dialog */}
      <CancelModal
        openState={commentState}
        title={'댓글 등록'}
        text1={'작성하신 댓글을 등록하시겠습니까?'}
        text2={''}
        yesAction={postComment}
        closeAction={() => dispatch(clickCommentGoBack())} />

    </Stack>
  )
}