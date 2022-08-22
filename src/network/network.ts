import axios from 'axios';

const SUCCESS = 200
const BAD_REQUEST = 400;

axios.defaults.withCredentials = true;

class Api {
  /* 로그인 */
  async postLogin(password: {}) {
    const response = await axios.post(`/api/admin/login`, password);
    return response;
  };

  /* 로그아웃 */
  async getLogout() {
    const response = await axios.get(`/api/admin/logout`);
    return response;
  };

  /* 관리자 정보 */
  // footer 정보 받아오기
  async getFooter() {
    const response = await axios.get(`/api/admin/footer`);
    return response.data;
  };

  // 정보 받아오기
  async getPanelInfo() {
    const response = await axios.get(`/api/admin/panel`);
    return response.data;
  };

  // 비밀번호 변경
  async putUpdatePassword(updatePassword: { curPassword: string, newPassword: string, newPasswordCheck: string }) {
    const response = await axios.put(`/api/admin/password`, updatePassword);
    return response.data
  };

  // 이메일 변경
  async putUpdateMail(mail: {}) {
    const response = await axios.put(`/api/admin/mail`, mail);
    return response.data;
  };

  // footer 정보 변경
  async putUpdateFooter(footer: {}) {
    const response = await axios.put(`/api/admin/footer`, footer);
    return response.data;
  };

  /* 회사 정보 */

  // 인사말 받아오기
  async getIntroduce() {
    const response = await axios.get(`/api/admin/introduce`);
    return response.data;
  };

  // 인사말 변경
  async putIntroduce(introduce: {}) {
    const response = await axios.put(`/api/admin/introduce`, introduce);
    return response.data;
  };

  // 조직도 받아오기
  async getOrgChart() {
    const response = await axios.get(`/api`);
    return response.data;
  }

  // 조직도 변경
  async putOrgChart(orgChart: FormData) {
    const response = await axios.post(`/api/admin/image`, orgChart, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 회사 연혁 변경
  async putHistory(history: FormData) {
    const response = await axios.put(`/api/admin/image`, history, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // CI 소개 변경
  async putCompanyInfo(company: FormData) {
    const response = await axios.put(`/api/admin/image`, company, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  /* 제품 카테고리 */

  // 메인 카테고리 목록 받아오기
  async getMainCategories() {
    const response = await axios.get(`/api/category/main`);
    return response.data;
  };

  // 제품 카테고리 목록 받아오기
  async getAllProductCategories() {
    const response = await axios.get(`/api/category/product`);
    return response.data;
  };

  // 카테고리 등록
  async postCreateCategory(category: {}) {
    const response = await axios.post(`/api/category`, category);
    return response.data;
  };

  // 카테고리 수정
  async putUpdateCategory(categoryId: number, categoryForm: FormData) {
    const response = await axios.put(`/api/category/${categoryId}`, categoryForm);
    return response.data;
  };

  // 제품 카테고리 삭제
  async deleteProductCategory(categoryId: number) {
    const response = await axios.delete(`/api/category/${categoryId}`);
    return response.data;
  };

  /* 자료실 */

  // 자료실 목록 받아오기
  async getArchives(pageNumber: number) {
    const response = await axios.get(`/api/archive?page=${pageNumber}`);
    return response.data;
  };

  // 자료실 공지사항 목록 받아오기
  async getArchivesNotice() {
    const response = await axios.get(`/api/archive/notice`);
    return response.data;
  };

  // 자료실 글 자세히보기
  async getArchive(archiveId: number) {
    const response = await axios.get(`/api/archive/${archiveId}`);
    return response.data;
  };

  // 자료실 게시글 등록
  async postCreateArchive(archive: {}) {
    const response = await axios.post(`/api/archive`, archive);
    return response.data;
  };

  // 자료실 게시글 수정  // 이거 get요청이랑 통일해줬으면 좋겠음 (new가 get에는 없고 put에는 있ㅇ므)
  async putUpdateArchive(archiveId: number, form: {}) {
    const response = await axios.put(`/api/archive/${archiveId}`, form);
    return response.data;
  };

  // 자료실 게시글 삭제
  async deleteArchive(archiveId: number) {
    const response = await axios.delete(`/api/archive/${archiveId}`);
    return response.data;
  };

  // 자료실 카테고리 목록 받아오기
  async getAllCategories() {
    const response = await axios.get(`/api/category`);
    return response.data;
  };

  // 자료실 카테고리 추가
  async createArchiveCategory(categoryName: { categoryName: string }) {
    const response = await axios.post(`/api/category`, categoryName)
    return response.data;
  };

  // 자료실 카테고리 삭제
  async deleteArchiveCategory(categoryId: number) {
    const response = await axios.delete(`/api/category/${categoryId}`)
    return response.data;
  }
};

export const api = new Api();