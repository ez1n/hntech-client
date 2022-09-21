import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

class FileApi {
  // 파일 다운로드
  async downloadFile(filename: string) {
    const response = await axios.get(`/file/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  };
};

export const fileApi = new FileApi();