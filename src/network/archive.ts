import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

class ArchiveApi {
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
    const response = await axios.post(`/api/archive`, archive, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 자료실 게시글 수정
  async putUpdateArchive(archiveId: number, form: {}) {
    const response = await axios.put(`/api/archive/${archiveId}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 자료실 기존 첨부파일 삭제
  async deleteArchiveFile(archiveId: number, fileId: number) {
    const response = await axios.delete(`/api/archive/${archiveId}/file/${fileId}`);
    return response.data;
  }

  // 자료실 게시글 삭제
  async deleteArchive(archiveId: number) {
    const response = await axios.delete(`/api/archive/${archiveId}`);
    return response.data;
  };

  // 자료실 검색
  async getSearchArchive(categoryName: string | null, keyword: string, pageNumber: number) {
    const response = await axios.get(`/api/archive?${categoryName !== null ? `category=${categoryName}&` : ''}${keyword !== '' ? `keyword=${keyword}&` : ''}page=${pageNumber}`);
    return response.data;
  }
};

export const archiveApi = new ArchiveApi();