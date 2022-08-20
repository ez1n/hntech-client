import axios from 'axios';

const SUCCESS = 200
const BAD_REQUEST = 400;

axios.defaults.withCredentials = true;

class Api {
  api: any

  constructor() {
    this.api = axios.create({
      baseURL: 'http://13.125.250.39',
    })
  }

  /* 로그인 */
  async postLogin(password: {}) {
    const response = await this.api.post(`/admin/login`, password);
    return response;
  };

  /* 로그아웃 */
  async getLogout() {
    const response = await this.api.get(`/admin/logout`);
    return response;
  };

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

  // FAQ 상세보기
  async getFAQDetail(questionId: number) {
    const response = await this.api.get(`/question/${questionId}`);
    return response.data;
  };

  // 문의사항 상세보기 - 비밀번호
  async postPassword(questionId: number, password: {}) {
    const response = await this.api.post(`/question/${questionId}`, password);
    return response.data;
  };

  // 문의사항 상세보기 - 관리자
  async getQuestionByAdmin(questionId: number) {
    const response = await this.api.get(`/admin/question/${questionId}`);
    return response.data;
  };

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

  // 문의게시판 FAQ (게시글 수정)
  async putUpdateFAQ(questionId: number, currentQuestion: { title: string, content: string, faq: string }) {
    const response = await this.api.put(`/admin/question/${questionId}`, currentQuestion);
    if (response.status !== SUCCESS) {
      console.error(response.data);
      return;
    }
    console.log(response.data);
  };

  // 문의게시판 답변완료
  async putUpdateQuestionStatus(questionId: number) {
    const response = await this.api.put(`/admin/question/${questionId}/complete`);
    return response.data;
  };

  // 댓글 등록
  async postCreateComment(questionId: number, comment: {}) {
    const response = await this.api.post(`/question/${questionId}/comment`, comment);
    return response.data;
  };

  // 댓글 수정 
  async putCreateComment(questionId: number, commentId: number, comment: {}) {
    const response = await this.api.put(`/question/${questionId}/comment/${commentId}`, comment);
    return response.data;
  };

  // 댓글 삭제
  async deleteComment(questionId: number, commentId: number) {
    const response = await this.api.delete(`/question/${questionId}/comment/${commentId}`);
    return response.data;
  };

  /* 관리자 정보 */

  // 이메일, 비밀번호 받아오기
  //이건 혹시 그냥 post로 보내기만 하는건감?
  async getMail(mail: {}) {
    const response = await this.api.get('');
    return response.data;
  };

  // 이메일, 비밀번호 변경
  async putUpdateMail(mail: {}) {
    const response = await this.api.put(`/admin/mail`, mail);
    return response.data;
  };

  // footer 정보 받아오기
  async getFooter() {
    const response = await this.api.put(`/admin/footer`);
    return response.data;
  };

  // footer 정보 변경
  async putUpdateFooter(footer: {}) {
    const response = await this.api.put(`/admin/footer`, footer);
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
    const response = await this.api.get(``);
    return response.data;
  }

  // 조직도 변경
  async putOrgChart(orgChart: FormData) {
    const response = await this.api.post(`/admin/image`, orgChart, {
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

  // 제품 카테고리 목록 받아오기
  async getAllCategories() {
    const response = await this.api.get(`/category/product`);
    return response.data;
  };

  // 카테고리 등록
  async postCreateCategory(category: {}) {
    const response = await this.api.post(`/category`, category);
    return response.data;
  };

  // 카테고리 수정
  async putUpdateCategory(categoryId: number, categoryForm: FormData) {
    const response = await this.api.put(`/category/${categoryId}`, categoryForm);
    return response.data;
  };

  // 카테고리 삭제
  async deleteCategory(categoryId: number) {
    const response = await this.api.delete(`/category/${categoryId}`);
    return response.data;
  };

  /* 자료실 */

  // 자료실 목록 받아오기
  async getArchives(pageNumber: number) {
    const response = await this.api.get(`/archive/all?page=${pageNumber}`);
    return response.data;
  };

  // 자료실 공지사항 목록 받아오기
  async getArchivesNotice() {
    const response = await this.api.get(`/archive/notice`);
    return response.data;
  };

  // 자료실 글 자세히보기
  async getArchive(archiveId: number) {
    const response = await this.api.get(`/archive/${archiveId}`);
    return response.data;
  };

  // 자료실 게시글 등록
  async postCreateArchive(archive: {}) {
    const response = await this.api.post(`/archive`, archive);
    return response.data;
  };

  // 자료실 게시글 수정  // 이거 get요청이랑 통일해줬으면 좋겠음 (new가 get에는 없고 put에는 있ㅇ므)
  async putUpdateArchive(archiveId: number, form: {}) {
    const response = await this.api.put(`/archive/${archiveId}`, form);
    return response.data;
  };

  // 자료실 게시글 삭제
  async deleteArchive(archiveId: number) {
    const response = await this.api.delete(`/archive/${archiveId}`);
    return response.data;
  };

  /* 파일 등록 */

  // 단일 파일 전송
  async postUploadFile(file: FormData) {
    const response = await this.api.post(`/file/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 다중 파일 전송
  async postUploadAllFiles(files: FormData) {
    const response = await this.api.post(`/file/upload-all`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 파일 다운로드
  async downloadFile(filename: string) {
    const response = await this.api.get(`/file/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  };
};

export const api = new Api();