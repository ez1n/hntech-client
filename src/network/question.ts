import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

class QuestionApi {
  // 문의사항 글쓰기
  async postCreateQuestion(createQuestionForm: {}) {
    const response = await axios.post(`/api/question`, createQuestionForm);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    console.log(response.data);
  };

  // 문의사항 목록 받아오기
  async getAllQuestions(pageNumber: number) {
    const response = await axios.get(`/api/question?page=${pageNumber}`);
    return response.data;
  };

  // FAQ
  async getFAQ() {
    const response = await axios.get(`/api/question/faq?page=0`);
    return response.data;
  };

  // FAQ 상세보기
  async getFAQDetail(questionId: number) {
    const response = await axios.get(`/api/question/${questionId}`);
    return response.data;
  };

  // 문의사항 상세보기 - 비밀번호
  async postPassword(questionId: number, password: {}) {
    const response = await axios.post(`/api/question/${questionId}`, password);
    return response.data;
  };

  // 문의사항 상세보기 - 관리자
  async getQuestionByAdmin(questionId: number) {
    const response = await axios.get(`/api/admin/question/${questionId}`);
    return response.data;
  };

  // 문의사항 글 삭제
  async deleteQuestion(questionId: number) {
    const response = await axios.delete(`/api/question/${questionId}`);
    return response.data;
  };

  // 문의사항 글 수정 (변경 요청)
  async putQuestion(questionId: number, updateQuestionForm: {}) {
    const response = await axios.put(`/api/question/${questionId}`, updateQuestionForm);
    return response.data;
  };

  // 문의게시판 FAQ (게시글 수정)
  async putUpdateFAQ(questionId: number, currentQuestion: { title: string, content: string, faq: string }) {
    const response = await axios.put(`/api/admin/question/${questionId}`, currentQuestion);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    console.log(response.data);
  };

  // 문의게시판 답변완료
  async putUpdateQuestionStatus(questionId: number) {
    const response = await axios.put(`/api/admin/question/${questionId}/complete`);
    return response.data;
  };
};

export const questionApi = new QuestionApi();