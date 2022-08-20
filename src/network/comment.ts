import baseApi from "./baseApi";

const SUCCESS = 200
const BAD_REQUEST = 400;

class CommentApi {
  // 댓글 등록
  async postCreateComment(questionId: number, comment: {}) {
    const response = await baseApi.post(`/question/${questionId}/comment`, comment);
    return response.data;
  };

  // 댓글 수정 
  async putCreateComment(questionId: number, commentId: number, comment: {}) {
    const response = await baseApi.put(`/question/${questionId}/comment/${commentId}`, comment);
    return response.data;
  };

  // 댓글 삭제
  async deleteComment(questionId: number, commentId: number) {
    const response = await baseApi.delete(`/question/${questionId}/comment/${commentId}`);
    return response.data;
  };

};

export const commentApi = new CommentApi();