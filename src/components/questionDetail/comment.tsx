import React from 'react';
import { api } from '../../network/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickCommentRemoveGoBack } from '../../app/reducers/dialogSlice';
import {
  resetAnchor,
  setAnchor,
  setCurrentComment,
  updateCommentState
} from '../../app/reducers/commentSlice';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

export default function Comment() {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자모드 state
  const comments = useAppSelector(state => state.question.detail.comments); // 댓글 정보 (데이터) state
  const currentComment = useAppSelector(state => state.comment.currentComment); // 선택한 댓글 정보
  const commentAnchor = useAppSelector(state => state.comment.commentAnchor); // 댓글 메뉴 위치 state 
  const commentModifyState = useAppSelector(state => state.comment.commentModifyState); // 댓글 수정 state
  const commentRemoveState = useAppSelector(state => state.dialog.commentRemoveState); // 댓글 삭제 state
  const commentMenuOpen = Boolean(commentAnchor); // 댓글 메뉴 open

  // 댓글 수정
  const putComment = () => {
    //댓글수정
    console.log('삭제');
    dispatch(clickCommentRemoveGoBack());
  };

  // 댓글 삭제
  const deleteComment = (commentId: number) => {
    // api.deleteComment(commentId)
    //   .then(res => {
    //     dispatch(clickCommentRemoveGoBack());
    //     dispatch(resetAnchor());
    //     alert('삭제되었습니다.')
    // })
    console.log(commentId)
  };

  return (
    <>
      {comments.map((item, index) => (
        <Stack
          direction='row'
          key={index}
          sx={{
            borderBottom: '1px solid #2E7D32',
            flexDirection: `${item.writer === '작성자' && 'row-reverse'}`,
            textAlign: `${item.writer === '작성자' && 'end'}`
          }}>
          {/*  댓글 내용 */}
          <Stack
            key={index}
            direction='column'
            spacing={1}
            sx={{
              p: 2,
              width: '100%',
            }}>
            <Typography sx={{ fontSize: 20 }}>{item.writer}</Typography>
            <Typography>{item.content}</Typography>
          </Stack>

          {/* 수정, 삭제 버튼 */}
          {managerMode ?
            // 관리자 댓글
            < Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  dispatch(setAnchor({ anchor: event.currentTarget }));
                  dispatch(setCurrentComment({ content: item.content, id: item.id }));
                }}
                sx={{ color: '#0F0F0F' }}>
                <MoreVertTwoToneIcon sx={{ fontSize: 30 }} />
              </Button>

              <Menu
                anchorEl={commentAnchor}
                open={commentMenuOpen}
                onClose={() => dispatch(resetAnchor())}
              >
                <MenuItem onClick={() => {
                  dispatch(updateCommentState());
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  dispatch(setAnchor({ anchor: event.currentTarget }));
                  dispatch(setCurrentComment({ content: item.content, id: item.id }));
                }}
                sx={{ color: '#0F0F0F', display: `${item.writer === '관리자' && 'none'}` }}>
                <MoreVertTwoToneIcon sx={{ fontSize: 30 }} />
              </Button>

              <Menu
                anchorEl={commentAnchor}
                open={commentMenuOpen}
                onClose={() => dispatch(resetAnchor())}
              >
                <MenuItem onClick={() => {
                  dispatch(updateCommentState());
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

          {/* 댓글 삭제 Dialog */}
          <Dialog
            open={commentRemoveState}
            onClose={() => dispatch(clickCommentRemoveGoBack())}>
            <DialogTitle>
              댓글 삭제
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                삭제된 댓글은 복구할 수 없습니다.
              </DialogContentText>
              <DialogContentText>
                삭제하시겠습니까?
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => { deleteComment(currentComment.id) }}>
                네
              </Button>
              <Button onClick={() => dispatch(clickCommentRemoveGoBack())}>
                아니오
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      ))
      }
    </>
  )
}