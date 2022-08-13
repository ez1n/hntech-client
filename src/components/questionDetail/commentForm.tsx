import React, { useRef } from 'react';
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

  const commentState = useAppSelector(state => state.dialog.commentState); // 댓글 입력 취소  state
  const comment = useAppSelector(state => state.comment.comment); // 댓글 state

  // 댓글 등록
  const postComment = () => {
    console.log(comment);
    dispatch(setComment({ comment: '' }));
    //
  };

  return (
    <Stack direction='column' sx={{ alignItems: 'center' }}>
      <TextField
        onChange={event => dispatch(setComment({ comment: event.target.value }))}
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
          <Button onClick={() => {
            postComment();
            dispatch(clickCommentGoBack());
            commentRef.current.value = '';
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickCommentGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}