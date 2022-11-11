import axios from "axios";

class FileApi {
  // 파일 다운로드
  async downloadFile(filename: string) {
    const response = await axios.get(`/api/file/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  };
}

export const fileApi = new FileApi();