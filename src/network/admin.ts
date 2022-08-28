import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

class AdminApi {
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

  // banner 받아오기
  async getBanner() {
    const response = await axios.get(`/api/admin/banner`);
    return response.data;
  };

  // banner 수정하기
  async putBanner(banner: FormData) {
    const response = await axios.put(`/api/admin/banner`, banner, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 로고 수정하기

  /* 관리자 정보 */

  // footer 정보 받아오기
  async getFooter() {
    const response = await axios.get(`/api/admin/footer`);
    return response.data;
  };

  // 관리자 패널 정보 받아오기
  async getPanelInfo() {
    const response = await axios.get(`/api/admin/panel`);
    return response.data;
  };

  // 관리자 비밀번호 변경
  async putUpdatePassword(updatePassword: { curPassword: string, newPassword: string, newPasswordCheck: string }) {
    const response = await axios.put(`/api/admin/password`, updatePassword);
    return response.data
  };

  // 관리자 패널 정보 변경
  async putUpdatePanelInfo(panelData: {}) {
    const response = await axios.put(`/api/admin/panel`, panelData);
    return response.data;
  };

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
};

export const adminApi = new AdminApi();