import axios from "axios";

const SUCCESS = 200

class QuestionApi {
  // 문의사항 글쓰기
  async postCreateQuestion(createQuestionForm: FormData) {
    const response = await axios.post(`/question`, createQuestionForm);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    return response.data
  };

  // 문의사항 목록 받아오기
  async getAllQuestions(pageNumber: number) {
    const response = await axios.get(`/question?page=${pageNumber}`);
    return response.data;
  };

  // FAQ 목록 받아오기
  async getFAQ() {
    const response = await axios.get(`/question/faq?page=0`);
    return response.data;
  };

  // FAQ 상세보기
  async getFAQDetail(questionId: number) {
    const response = await axios.get(`/question/faq/${questionId}`);
    return response.data;
  };

  // 문의사항 상세보기 - 비밀번호
  async postPassword(questionId: number, password: {}) {
    const response = await axios.post(`/question/${questionId}`, password);
    return response.data;
  };

  // 문의사항 상세보기 - 관리자
  async getQuestionByAdmin(questionId: number) {
    const response = await axios.get(`/admin/question/${questionId}`);
    return response.data;
  };

  // 문의사항 글 삭제
  async deleteQuestion(questionId: number) {
    const response = await axios.delete(`/question/${questionId}`);
    return response.data;
  };

  // 문의사항 변경하기
  async putQuestion(questionId: number, updateQuestionForm: FormData) {
    const response = await axios.put(`/question/${questionId}`, updateQuestionForm);
    return response.data;
  };

  // 문의게시판 FAQ (게시글 수정)
  async putUpdateFAQ(questionId: number, currentQuestion: FormData) {
    const response = await axios.put(`/admin/question/${questionId}`, currentQuestion);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    return response.data;
  };

  // 문의게시판 답변완료
  async putUpdateQuestionStatus(questionId: number) {
    const response = await axios.put(`/admin/question/${questionId}/complete`);
    return response.data;
  };

  async deleteQuestionFile(questionId: number, fileId: number) {
    const response = await axios.delete(`/question/${questionId}/file/${fileId}`);
    return response.data;
  };
};

export const questionApi = new QuestionApi();