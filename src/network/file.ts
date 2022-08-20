import baseApi from "./baseApi";

const SUCCESS = 200
const BAD_REQUEST = 400;

class FileApi {
  // 단일 파일 전송
  async postUploadFile(file: FormData) {
    const response = await baseApi.post(`/file/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 다중 파일 전송
  async postUploadAllFiles(files: FormData) {
    const response = await baseApi.post(`/file/upload-all`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 파일 다운로드
  async downloadFile(filename: string) {
    const response = await baseApi.get(`/file/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  };
};

export const fileApi = new FileApi();