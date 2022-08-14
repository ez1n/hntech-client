import React, { useRef } from 'react';
import { api } from '../../network/network';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setComment } from '../../app/reducers/commentSlice';
import { clickCommentGoBack } from '../../app/reducers/dialogSlice';
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

export default function CommentForm() {
  const dispatch = useAppDispatch();

  const commentRef: React.Ref<any> = useRef();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const detail = useAppSelector(state => state.question.detail); // 게시글 정보 state
  const commentState = useAppSelector(state => state.dialog.commentState); // 댓글 입력 취소  state
  const comment = useAppSelector(state => state.comment.comment); // 댓글 state
  const writer = managerMode ? '관리자' : '작성자'; // writer

  // 댓글 등록
  const postComment = () => {
    api.postCreateComment(detail.id, comment)
      .then(res => {
        alert('댓글이 등록되었습니다.');
        dispatch(clickCommentGoBack());
        commentRef.current.value = '';
      });
  };

  return (
    <Stack direction='column' sx={{ alignItems: 'center' }}>
      <TextField
        onChange={event => dispatch(setComment({ comment: event.target.value, writer: writer }))}
        inputRef={commentRef}
        multiline
        minRows={3}
        variant={'filled'}
        label={'댓글 작성'}
        sx={{ width: '100%' }} />

      <Box sx={{ width: '100%', textAlign: 'end' }}>
        <Button
          onClick={() => { dispatch(clickCommentGoBack()) }}
          sx={{ fontSize: 16, color: 'green' }}>
          등록
        </Button>
      </Box>

      {/* 댓글 등록 Dialog */}
      <Dialog
        open={commentState}
        onClose={() => dispatch(clickCommentGoBack())}>
        <DialogTitle>
          댓글 등록
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            작성하신 댓글을 등록하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={postComment}>
            네
          </Button>
          <Button onClick={() => dispatch(clickCommentGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}