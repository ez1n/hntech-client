import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 상세보기

/**
 * productList : 제품 목록
 * currentProductData : 선택한 제품 정보
 * productDetail : 제품 상세정보
 * activeStep : 보여지는 제품 이미지 번호
 */

/**
 * getProductList : 제품 목록 받아오기
 * getCurrentProductData : 선택한 제품 정보 받아오기
 * getProductDetail : 제품 상세정보 받아오기
 * nextImage : 다음 이미지
 * prevImage : 이전 이미지
 */

interface productInitialState {
  productList: {
    id: number,
    image: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string
    },
    productName: string
  }[],
  currentProductData: {
    id: number,
    image: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string
    },
    productName: string
  },
  productDetail: {
    category: string,
    description: string,
    files: {
      docFiles: [
        {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string,
          type: string
        }
      ],
      productImages: [
        {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }
      ],
      representativeImage: {
        id: number,
        originalFilename: string,
        savedPath: string,
        serverFilename: string
      },
      standardImages: [
        {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string
        }
      ]
    },
    id: number,
    productName: string
  },
  activeStep: number
};

const ProductInitialState: productInitialState = {
  productList: [],
  currentProductData: {
    id: 0,
    image: {
      id: 0,
      originalFilename: '',
      savedPath: '',
      serverFilename: ''
    },
    productName: ''
  },
  productDetail: {
    category: '',
    description: '',
    files: {
      docFiles: [
        {
          id: 0,
          originalFilename: '',
          savedPath: '',
          serverFilename: '',
          type: ''
        }
      ],
      productImages: [
        {
          id: 0,
          originalFilename: '',
          savedPath: '',
          serverFilename: ''
        }
      ],
      representativeImage: {
        id: 0,
        originalFilename: '',
        savedPath: '',
        serverFilename: ''
      },
      standardImages: [
        {
          id: 0,
          originalFilename: '',
          savedPath: '',
          serverFilename: ''
        }
      ]
    },
    id: 0,
    productName: ''
  },
  activeStep: 0
};

export const ProductSlice = createSlice({
  name: 'product',
  initialState: ProductInitialState,
  reducers: {
    getProductList: (
      state,
      action: PayloadAction<{
        productList: {
          id: number,
          image: {
            id: number,
            originalFilename: string,
            savedPath: string,
            serverFilename: string
          },
          productName: string
        }[]
      }>
    ) => { state.productList = action.payload.productList },
    getCurrentProductData: (
      state,
      action: PayloadAction<{
        productData: {
          id: number,
          image: {
            id: number,
            originalFilename: string,
            savedPath: string,
            serverFilename: string
          },
          productName: string
        }
      }>
    ) => { state.currentProductData = action.payload.productData },
    getProductDetail: (
      state,
      action: PayloadAction<{
        detail: {
          category: string,
          description: string,
          files: {
            docFiles: [
              {
                id: number,
                originalFilename: string,
                savedPath: string,
                serverFilename: string,
                type: string
              }
            ],
            productImages: [
              {
                id: number,
                originalFilename: string,
                savedPath: string,
                serverFilename: string
              }
            ],
            representativeImage: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            },
            standardImages: [
              {
                id: number,
                originalFilename: string,
                savedPath: string,
                serverFilename: string
              }
            ]
          },
          id: number,
          productName: string
        }
      }>
    ) => { state.productDetail = action.payload.detail },
    nextImage: (state) => { state.activeStep = state.activeStep + 1 },
    prevImage: (state) => { state.activeStep = state.activeStep - 1 }
  }
}
);

export const {
  getProductList,
  getCurrentProductData,
  getProductDetail,
  nextImage,
  prevImage } = ProductSlice.actions;
export default ProductSlice.reducer;