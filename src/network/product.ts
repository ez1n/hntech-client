import axios from 'axios';

axios.defaults.withCredentials = true;

class ProductApi {
  // 제품 목록 받아오기
  async getAllProducts(category: string) {
    const response = await axios.get(`/product?category=${category}`);
    return response.data.products;
  };

  // 제품 상세보기
  async getProduct(productId: number) {
    const response = await axios.get(`/product/${productId}`);
    return response.data;
  };

  // 제품 등록하기
  async postCreateProduct(productContent: FormData) {
    const response = await axios.post(`/product`, productContent, {
      headers: {
        'ContentType': 'multipart/form-data'
      }
    });
    return response.data;
  };

  // 제품 첨부파일 버튼명 수정
  async putUpdateProductDocFiles(productId: number, fileId: number, filename: {}) {
    const response = await axios.put(`/product/${productId}/file/${fileId}`, filename);
    return response.data
  }

  // 제품 정보 변경하기
  async putUpdateProduct(productId: number, productContent: FormData) {
    const response = await axios.put(`/product/${productId}`, productContent);
    return response.data;
  };

  // 제품 정보 삭제하기
  async deleteProduct(productId: number) {
    const response = await axios.delete(`/product/${productId}`);
    return response.data;
  };

  // 기존 파일 삭제
  async deleteProductFile(productId: number, fileId: number) {
    const response = await axios.delete(`/product/${productId}/file/${fileId}`);
    return response.data;
  };

  // 제품 순서 변경
  async putUpdateProductSequence(productSequence: { currentProductId: number, targetProductId: number }) {
    const response = await axios.put(`/product/sequence`, productSequence);
    return response.data.products;
  };
};

export const productApi = new ProductApi();