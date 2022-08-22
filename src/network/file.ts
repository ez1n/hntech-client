import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

class FileApi {
  // 단일 파일 전송
  async postUploadFile(file: FormData, type: string) {
    const response = await axios.post(`/api/file/${type}/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 다중 파일 전송
  async postUploadAllFiles(files: FormData, type: string) {
    const response = await axios.post(`/api/file/${type}/upload-all`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 파일 다운로드
  async downloadFile(filename: string) {
    const response = await axios.get(`/api/file/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  };
};

export const fileApi = new FileApi();