import baseApi from "./baseApi";

const SUCCESS = 200
const BAD_REQUEST = 400;

class ArchiveApi {
  // 자료실 목록 받아오기
  async getArchives(pageNumber: number) {
    const response = await baseApi.get(`/archive/all?page=${pageNumber}`);
    return response.data;
  };

  // 자료실 공지사항 목록 받아오기
  async getArchivesNotice() {
    const response = await baseApi.get(`/archive/notice`);
    return response.data;
  };

  // 자료실 글 자세히보기
  async getArchive(archiveId: number) {
    const response = await baseApi.get(`/archive/${archiveId}`);
    return response.data;
  };

  // 자료실 게시글 등록
  async postCreateArchive(archive: {}) {
    const response = await baseApi.post(`/archive`, archive);
    return response.data;
  };

  // 자료실 게시글 수정  // 이거 get요청이랑 통일해줬으면 좋겠음 (new가 get에는 없고 put에는 있ㅇ므)
  async putUpdateArchive(archiveId: number, form: {}) {
    const response = await baseApi.put(`/archive/${archiveId}`, form);
    return response.data;
  };

  // 자료실 게시글 삭제
  async deleteArchive(archiveId: number) {
    const response = await baseApi.delete(`/archive/${archiveId}`);
    return response.data;
  };
};

export const archiveApi = new ArchiveApi();