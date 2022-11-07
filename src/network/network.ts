import axios from 'axios';

axios.defaults.withCredentials = true;

class Api {
  // url
  baseUrl() {
    return 'https://7550-117-17-163-69.jp.ngrok.io'
  };

  // 로그인 확인
  async getCheckLogin() {
    const response = await axios.get(`/api/check-login`);
    return response.data.result;
  }
};

export const api = new Api();