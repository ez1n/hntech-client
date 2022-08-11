import axios from 'axios';

const SUCCESS = 200;
const BAD_REQUEST = 400;

class Api {
  api: any

  constructor() {
    this.api = axios.create({
      baseURL: 'https://e96d-211-117-246-158.jp.ngrok.io',
    })
  }

  // 문의사항 글쓰기
  async postCreateQuestion(createQuestionForm: {}) {
    const response = await this.api.post('/question', createQuestionForm);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    console.log(response.data);
  };

  // 문의사항 목록 받아오기
  async getAllQuestions(pageNumber: number) {
    const response = await this.api.get(`/question?page=${pageNumber}`);
    return response.data;
  };

  // FAQ
  async getFAQ() {
    const response = await this.api.get(`/question/faq?page=0`);
    return response.data;
  };

  // 문의사항 비밀번호
  async postPassword(questionId: number, password: {}) {
    const response = await this.api.post(`/question/${questionId}`, password);
    return response.data;
  };

  // 문의사항 글 삭제
  async deleteQuestion(questionId: number) {
    const response = await this.api.delete(`/question/${questionId}`);
    return response.data;
  };
};

export const api = new Api();