import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

// 댓글 (문의사항 상세보기)

/**
 * comment : 댓글
 */

/**
 * setComment : 댓글 입력
 */

interface commentInitialState {
  commentAnchor: HTMLAnchorElement | null,
  comment: string
};

const CommentInitialState: commentInitialState = {
  commentAnchor: null,
  comment: ''
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
      action: PayloadAction<{ comment: string }>
    ) => { state.comment = action.payload.comment }
  }
});

export const { setAnchor, resetAnchor, setComment } = CommentSlice.actions;
export default CommentSlice.reducer;