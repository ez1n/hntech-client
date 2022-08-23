import axios from 'axios';

const SUCCESS = 200
const BAD_REQUEST = 400;

axios.defaults.withCredentials = true;

class Api {
  /* etc */
  // 이미지 요청
  async getMainCategory(serverFilename: string) {
    const response = await axios.get(`/api/files/category/${serverFilename}`);
    return response;
  }
};

export const api = new Api();