import React from 'react';
import {commentApi} from '../../network/comment';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clickCommentRemoveGoBack} from '../../app/reducers/dialogSlice';
import {updateCommentData} from '../../app/reducers/questionSlice';
import {
  resetAnchor,
  setAnchor,
  setCurrentComment,
  updateComment,
  updateCommentState
} from '../../app/reducers/commentSlice';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

interface propsType {
  item: {
    content: string;
    id: number;
    sequence: number;
    writer: string;
  },
  questionId: number
}

export default function Comment({item, questionId}: propsType) {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자모드 state
  const commentAnchor = useAppSelector(state => state.comment.commentAnchor); // 댓글 메뉴 위치 state 
  const commentModifyState = useAppSelector(state => state.comment.commentModifyState); // 댓글 수정 state
  const commentModify = useAppSelector(state => state.comment.commentModify); // 수정 댓글
  const currentComment = useAppSelector(state => state.comment.currentComment); // 현재 댓글 정보
  const commentMenuOpen = Boolean(commentAnchor); // 댓글 메뉴 open

  // 댓글 수정
  const putComment = (questionId: number, commentId: number, comment: {}) => {
    commentApi.putCreateComment(questionId, commentId, comment)
      .then(res => dispatch(updateCommentData({comments: res.comments})))
      .catch(error => console.log(error))
  };

  return (
    <Stack
      direction='row'
      sx={{
        borderBottom: '1px solid #2E7D32',
        flexDirection: `${item.writer !== '관리자' && 'row-reverse'}`,
        textAlign: `${item.writer !== '관리자' && 'end'}`
      }}>
      {/*  댓글 내용 */}
      {commentModifyState === item.id ?
        <Stack sx={{width: '100%'}}>
          <Typography sx={{fontSize: 20}}>{item.writer}</Typography>
          <TextField
            defaultValue={currentComment.content}
            onChange={event => dispatch(updateComment({content: event?.target.value}))}
            inputProps={{maxLength: 50}}
          />
          <Stack direction='row' sx={{width: '100%', justifyContent: 'flex-end'}}>
            <Button
              onClick={() => {
                putComment(questionId, item.id, commentModify);
                dispatch(updateCommentState({id: null}));
              }}
              sx={{fontSize: 16, color: 'green'}}>
              수정
            </Button>
            <Button
              onClick={() => dispatch(updateCommentState({id: null}))}
              sx={{fontSize: 16, color: 'green'}}>
              취소
            </Button>
          </Stack>
        </Stack>
        :
        <Stack
          direction='column'
          spacing={1}
          sx={{
            p: 2,
            width: '100%',
          }}>
          <Typography sx={{fontSize: 20}}>{item.writer}</Typography>
          <Typography>{item.content}</Typography>
        </Stack>
      }

      {/* 수정, 삭제 버튼 */}
      {managerMode ?
        // 관리자 댓글
        < Box sx={{display: 'flex', alignItems: 'center'}}>
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              dispatch(setAnchor({anchor: event.currentTarget}));
              dispatch(setCurrentComment({content: item.content, id: item.id}));
            }}
            sx={{color: '#0F0F0F'}}>
            <MoreVertTwoToneIcon sx={{fontSize: 30}}/>
          </Button>

          <Menu
            anchorEl={commentAnchor}
            open={commentMenuOpen}
            onClose={() => dispatch(resetAnchor())}
          >
            <MenuItem onClick={() => {
              dispatch(updateCommentState({id: currentComment.id}));
              dispatch(resetAnchor());
            }}>
              수정
            </MenuItem>
            <MenuItem onClick={() => {
              dispatch(clickCommentRemoveGoBack());
              dispatch(resetAnchor());
            }}>
              삭제
            </MenuItem>
          </Menu>
        </Box> :

        // 문의 댓글
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              dispatch(setAnchor({anchor: event.currentTarget}));
              dispatch(setCurrentComment({content: item.content, id: item.id}));
            }}
            sx={{color: '#0F0F0F', display: `${item.writer === '관리자' && 'none'}`}}>
            <MoreVertTwoToneIcon sx={{fontSize: 30}}/>
          </Button>

          <Menu
            anchorEl={commentAnchor}
            open={commentMenuOpen}
            onClose={() => dispatch(resetAnchor())}
          >
            <MenuItem onClick={() => {
              dispatch(updateCommentState({id: currentComment.id}));
              dispatch(resetAnchor());
            }}>
              수정
            </MenuItem>
            <MenuItem onClick={() => {
              dispatch(clickCommentRemoveGoBack());
              dispatch(resetAnchor());
            }}>
              삭제
            </MenuItem>
          </Menu>
        </Box>
      }
    </Stack>
  )
}