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

  ////////////////////// 여기서부터 다시 해야댐 //////////////////////

  // 문의사항 글 수정 (변경 요청) (state => createQuestionForm)
  async updateQuestion(updateQuestionForm: {}) {
    const response = await this.api.put(`/question`, updateQuestionForm);
    return response.data;
  };

  // 문의사항 댓글 등록 (state => commentSlice)
  async postComment(comment: string) {
    const response = await this.api.post(``, comment);
    return response.data;
  };

  // 문의사항 댓글 수정
  async putComment() {
    const response = await this.api.put(``,);
    return response.data;
  };

  // 문의사항 댓글 삭제
  async deleteComment() {
    const response = await this.api.delete(``,);
    return response.data;
  };

  // 문의게시판 공지사항 글쓰기 (state => formContentSlice noticeContent)
  async postCreateNotice(createNoticeForm: {}) {
    const response = await this.api.post('', createNoticeForm);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    console.log(response.data);
  };

  // 관리자 정보 변경
  async putManagerData() {
    const response = await this.api.put('',);
    return response.data;
  };
};

export const api = new Api();