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

  /* 문의사항 */

  // 문의사항 글쓰기
  async postCreateQuestion(createQuestionForm: {}) {
    const response = await this.api.post(`/question`, createQuestionForm);
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

  ////////////////////// 여기서부터 다시 해야댐 //////////////////////

  // 문의사항 글 삭제
  async deleteQuestion(questionId: number) {
    const response = await this.api.delete(`/question/${questionId}`);
    return response.data;
  };

  // 문의사항 글 수정 (변경 요청)
  async putQuestion(questionId: number, updateQuestionForm: {}) {
    const response = await this.api.put(`/question/${questionId}`, updateQuestionForm);
    return response.data;
  };

  // 문의게시판 FAQ 글쓰기 -> 어떻게 보내지?
  async postCreateNotice(createNoticeForm: {}) {
    const response = await this.api.post(``, createNoticeForm);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    console.log(response.data);
  };

  // 댓글을 지금 목록 받아올때 한번에 정보를 주는데
  // 그렇게 하면 업데이트 하는 경우에 받아올 방법이 없음
  // 게시글 들어갔을 때 한번에 주는게 더 나을거같은데
  // 근데 이거말고도 다른 애들도 이런 이슈가 있음 예를 들면 문의사항 상세정보 라던가..
  // 댓글 등록
  async postCreateComment(questionId: number, comment: {}) {
    const response = await this.api.post(`/comment${questionId}`, comment);
    return response.data;
  };

  // 댓글 수정 => 댓글을 개별적으로 수정할 수 있게 하는 방법을 모르겠슴..
  async putCreateComment(commentId: number, comment: {}) {
    const response = await this.api.put(`/comment${commentId}`, comment);
    return response.data;
  };

  // 댓글 삭제
  async deleteComment(commentId: number,) {
    const response = await this.api.delete(`/comment${commentId}`);
    return response.data;
  };

  /* 관리자 정보 */

  // 관리자 정보 변경
  async putManagerData() {
    const response = await this.api.put('',);
    return response.data;
  };

  /* 회사 정보 */

  // 인사말 받아오기
  async getIntroduce() {
    const response = await this.api.get(`/admin/introduce`);
    return response.data;
  };

  // 인사말 변경
  async putIntroduce(introduce: {}) {
    const response = await this.api.put(`/admin/introduce`, introduce);
    return response.data;
  };

  // 조직도 받아오기
  async getOrgChart() {
    const response = await this.api.get('');
    return response.data;
  }

  // 조직도 변경
  async putOrgChart(orgChart: FormData) {
    const response = await this.api.put(`/admin/image`, orgChart, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 회사 연혁 변경
  async putHistory(history: FormData) {
    const response = await this.api.put(`/admin/image`, history, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // CI 소개 변경
  async putCompanyInfo(company: FormData) {
    const response = await this.api.put(`/admin/image`, company, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  /* 제품 카테고리 */

  // 메인 카테고리 목록 받아오기
  async getMainCategories() {
    const response = await this.api.get(`/category/main`);
    return response.data;
  };

  // 카테고리 목록 받아오기
  async getAllCategories() {
    const response = await this.api.get(`/category`);
    return response.data;
  };

  // 카테고리 등록
  async postAllCategories() {
    const response = await this.api.post(`/category`);
    return response.data;
  };

  // 카테고리 수정
  async putAllCategories(categoryId: number) {
    const response = await this.api.put(`/category${categoryId}`);
    return response.data;
  };

  // 카테고리 삭제
  async deleteCategory(categoryId: number) {
    const response = await this.api.delete(`/category${categoryId}`);
    return response.data;
  };
};

export const api = new Api();