import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

class CategoryApi {
  // 메인 카테고리 조회
  async getMainCategories() {
    const response = await axios.get(`/api/category/main`);
    return response.data.categories;
  }
};

export const categoryApi = new CategoryApi();