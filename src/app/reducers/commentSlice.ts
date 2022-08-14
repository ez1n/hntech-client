import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 댓글 (문의사항 상세보기)

/**
 * commentAnchor : 댓글 메뉴 위치
 * comment : 댓글
 * currentComment : 선택한 댓글
 * commentModify : 댓글 수정
 * commentModifyState : 댓글 수정 여부 state
 */

/**
 * setAnchor : 위치 설정
 * resetAnchor : 위치 초기화
 * setComment : 댓글 입력
 * setCurrentComment : 선택한 댓글 설정
 * updateComment : 댓글 수정
 * updateCommentState : 댓글 수정 여부
 */

interface commentInitialState {
  commentAnchor: HTMLAnchorElement | null,
  comment: { content: string, writer: string },
  currentComment: { content: string, id: number },
  commentModify: { content: string },
  commentModifyState: boolean
};

const CommentInitialState: commentInitialState = {
  commentAnchor: null,
  comment: { content: '', writer: '' },
  currentComment: { content: '', id: 0 },
  commentModify: { content: '' },
  commentModifyState: false
};

export const CommentSlice = createSlice({
  name: 'comment',
  initialState: CommentInitialState,
  reducers: {
    setAnchor: (
      state,
      action: PayloadAction<{ anchor: any }>
    ) => { state.commentAnchor = action.payload.anchor },
    resetAnchor: (state) => { state.commentAnchor = null },
    setComment: (
      state,
      action: PayloadAction<{ comment: string, writer: string }>
    ) => {
      state.comment.content = action.payload.comment;
      state.comment.writer = action.payload.writer;
    },
    setCurrentComment: (
      state,
      action: PayloadAction<{ content: string, id: number }>
    ) => { state.currentComment = { content: action.payload.content, id: action.payload.id } },
    updateComment: (
      state,
      action: PayloadAction<{ content: string }>
    ) => { state.commentModify.content = action.payload.content },
    updateCommentState: (state) => { state.commentModifyState = !state.commentModifyState }
  }
});

export const {
  setAnchor,
  resetAnchor,
  setComment,
  setCurrentComment,
  updateComment,
  updateCommentState } = CommentSlice.actions;
export default CommentSlice.reducer;