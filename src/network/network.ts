import axios from 'axios';

axios.defaults.withCredentials = true;

class Api {
  // url
  baseUrl() {
    return 'http://13.124.84.147'
  };

  // 로그인 확인
  async getCheckLogin() {
    const response = await axios.get(`/api/check-login`);
    return response.data.result;
  }
};

export const api = new Api();