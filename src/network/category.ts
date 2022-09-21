import axios from "axios";

const SUCCESS = 200
const BAD_REQUEST = 400;

axios.defaults.withCredentials = true;

class CategoryApi {
  /* 제품 카테고리 */

  // 메인 카테고리 조회
  async getMainCategories() {
    const response = await axios.get(`/category/main`);
    return response.data.categories;
  };

  // 제품 카테고리 목록 받아오기
  async getAllProductCategories() {
    const response = await axios.get(`/category/product`);
    return response.data;
  };

  // 제품 카테고리 등록
  async postCreateCategory(category: FormData) {
    const response = await axios.post(`/category`, category, {
      headers: {
        'Category-Type': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 제품 카테고리 수정
  async putUpdateProductCategory(categoryId: number, categoryData: FormData) {
    const response = await axios.put(`/category/${categoryId}`, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.categories;
  };

  // 제품 카테고리 삭제
  async deleteProductCategory(categoryId: number) {
    const response = await axios.delete(`/category/${categoryId}`);
    return response.data;
  };

  // 제품 카테고리 순서 변경
  async putUpdateCategorySequence(categorySequence: {currentCategoryId: number, targetCategoryId: number}) {
    const response = await axios.put(`/category/sequence`, categorySequence);
    return response.data.categories;
  }

  /* 자료실 카테고리 */

  // 자료실 카테고리 목록 받아오기
  async getAllCategories() {
    const response = await axios.get(`/category`);
    return response.data;
  };

  // 자료실 카테고리 추가
  async createArchiveCategory(categoryName: FormData) {
    const response = await axios.post(`/category`, categoryName, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data;
  };

  // 자료실 카테고리 삭제
  async deleteArchiveCategory(categoryId: number) {
    const response = await axios.delete(`/category/${categoryId}`)
    return response.data;
  };

  // 자료실 카테고리 수정
  async putUpdateArchiveCategory(categoryId: number, categoryData: FormData) {
    const response = await axios.put(`/category/${categoryId}`, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.categories;
  };
};

export const categoryApi = new CategoryApi();