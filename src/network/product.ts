import axios from 'axios';

const SUCCESS = 200
const BAD_REQUEST = 400;

axios.defaults.withCredentials = true;

class ProductApi {
  // 제품 목록 받아오기
  async getAllProducts(category: string) {
    const response = await axios.get(`/api/product?category=${category}`);
    return response.data.products;
  };

  // 제품 상세보기
  async getProduct(productId: number) {
    const response = await axios.get(`/api/product/${productId}`);
    return response.data;
  };

  // 제품 등록하기
  async postCreateProduct(productContent: FormData) {
    const response = await axios.post(`/api/product`, productContent, {
      headers: {
        'ContentType': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 제품 첨부파일 버튼명 수정
  async putUpdateProductDocFiles(productId: number, fileId: number, filename: {}) {
    const response = await axios.put(`/api/product/${productId}/file/${fileId}`, filename);
    return response.data
  }

  // 제품 정보 변경하기
  async putUpdateProduct(productId: number, productContent: FormData) {
    const response = await axios.put(`/api/product/${productId}`, productContent);
    return response.data;
  };

  // 제품 정보 삭제하기
  async deleteProduct(productId: number) {
    const response = await axios.delete(`/api/product/${productId}`);
    return response.data;
  };

  // 기존 파일 삭제
  async deleteProductFile(productId: number, fileId: number) {
    const response = await axios.delete(`/api/product/${productId}/file/${fileId}`);
    return response.data;
  };

  // 제품 순서 변경
  async patchUpdateCategorySequence(productId: number, targetProductId: number) {
    const response = await axios.patch(`/api/product`, { productId: productId, targetProductId: targetProductId });
    return response.data;
  };
};

export const productApi = new ProductApi();