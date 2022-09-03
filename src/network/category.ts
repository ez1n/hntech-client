import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

axios.defaults.withCredentials = true;

class CategoryApi {
  /* 제품 카테고리 */

  // 메인 카테고리 조회
  async getMainCategories() {
    const response = await axios.get(`/api/category/main`);
    return response.data.categories;
  };

  // 제품 카테고리 목록 받아오기
  async getAllProductCategories() {
    const response = await axios.get(`/api/category/product`);
    return response.data;
  };

  // 제품 카테고리 등록
  async postCreateCategory(category: FormData) {
    const response = await axios.post(`/api/category`, category, {
      headers: {
        'Category-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 제품 카테고리 수정
  async putUpdateProductCategory(categoryId: number, categoryData: FormData) {
    const response = await axios.put(`/api/category/${categoryId}`, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.categories;
  };

  // 제품 카테고리 삭제
  async deleteProductCategory(categoryId: number) {
    const response = await axios.delete(`/api/category/${categoryId}`);
    return response.data;
  };

  /* 자료실 카테고리 */

  // 자료실 카테고리 목록 받아오기
  async getAllCategories() {
    const response = await axios.get(`/api/category`);
    return response.data;
  };

  // 자료실 카테고리 추가
  async createArchiveCategory(categoryName: { categoryName: string }) {
    const response = await axios.post(`/api/category`, categoryName)
    return response.data;
  };

  // 자료실 카테고리 삭제
  async deleteArchiveCategory(categoryId: number) {
    const response = await axios.delete(`/api/category/${categoryId}`)
    return response.data;
  };

  // 자료실 카테고리 수정
  async putUpdateArchiveCategory(categoryId: number, categoryData: {}) {
    const response = await axios.put(`/api/category/${categoryId}`, categoryData);
    return response.data.categories;
  };
};

export const categoryApi = new CategoryApi();