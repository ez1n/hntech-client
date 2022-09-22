import React, {useRef, useState} from 'react';
import {commentApi} from '../../network/comment';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {setComment} from '../../app/reducers/commentSlice';
import {updateCommentData} from '../../app/reducers/questionSlice';
import {Box, Button, Stack, TextField} from '@mui/material';
import CancelModal from '../cancelModal';

interface propsType {
  id: number
}

export default function CommentForm({id}: propsType) {
  const dispatch = useAppDispatch();

  const commentRef: React.Ref<any> = useRef();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const comment = useAppSelector(state => state.comment.comment); // 댓글
  const [cancelComment, setCancelComment] = useState(false); // 댓글 입력

  // 댓글 등록 취소 modal - open
  const openCancelComment = () => {
    setCancelComment(cancelComment => !cancelComment);
  };

  // 댓글 등록 취소 modal - close
  const closeCancelComment = () => {
    setCancelComment(false);
  };

  // 댓글 등록
  const postComment = () => {
    commentApi.postCreateComment(id, comment)
      .then(res => {
        dispatch(updateCommentData({comments: res.comments}));
        closeCancelComment();
        commentRef.current.value = '';
      })
      .catch(error => console.log(error))
  };

  return (
    <Stack direction='column' sx={{alignItems: 'center'}}>
      <TextField
        onChange={event => dispatch(setComment({comment: event.target.value, writer: managerMode ? '관리자' : '작성자'}))}
        inputRef={commentRef}
        multiline
        minRows={3}
        variant={'filled'}
        label={'댓글 작성'}
        inputProps={{maxLength: 50}}
        sx={{width: '100%'}}/>

      <Box sx={{width: '100%', textAlign: 'end'}}>
        <Button
          onClick={openCancelComment}
          sx={{fontSize: 16, color: 'green'}}>
          등록
        </Button>
      </Box>

      {/* 댓글 등록 Dialog */}
      <CancelModal
        openState={cancelComment}
        title={'댓글 등록'}
        text1={'작성하신 댓글을 등록하시겠습니까?'}
        text2={''}
        yesAction={postComment}
        closeAction={closeCancelComment}/>

    </Stack>
  )
}