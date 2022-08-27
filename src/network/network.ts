import axios from 'axios';

const SUCCESS = 200
const BAD_REQUEST = 400;

axios.defaults.withCredentials = true;

class Api {
  // url
  baseUrl() {
    return 'http://13.125.250.39'
  };

  // 이미지 요청
  async getImageData(imageServerFilename: string) {
    const response = await axios.get(`/api/files/category/${imageServerFilename}`, {
      responseType: 'blob',
    });
    return response.data;
  };

  // 서버 연결 확인 (?)
  async getHello() {
    const response = await axios.get(`/api/`);
    return response.data;
  };

  // 에러
  async getError() {
    const response = await axios.get(`/api/error`);
    return response.data;
  };
};

export const api = new Api();