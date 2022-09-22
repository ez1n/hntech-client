import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 제품 등록

/**
 * productContent : 전송할 제품 정보
 */

/**
 * getProductContent : 제품 수정 정보 받아오기
 * addProductName : 제품 이름 변경
 * addProductDescription : 제품 상세 정보 변경
 * addProductCategory : 제품 카테고리 변경
 * addRepProductImage : 제품 대표 이미지 변경
 * addProductImage : 제품 이미지 추가
 * deleteProductImage : 제품 이미지 삭제
 * addStandardImage : 규격 이미지 추가
 * deleteStandardImage : 규격 이미지 삭제
 * addProductDocType : 첨부파일 버튼 이름 추가
 * addProductDoc : 첨부파일 추가
 * deleteProductDoc : 첨부파일 삭제
 * addProductDocUploadButton : 첨부파일 업로드 버튼 추가 (빈 버튼)
 * deleteProductDocUploadButton : 첨부파일 업로드 버튼 삭제
 * resetProductForm : 폼 초기화
 * deleteOriginalProductFile: 기존 제품 이미지 삭제
 */

interface productFormInitialState {
  productContent: {
    category: string,
    description: string,
    productName: string,
    files: {
      docFiles: {
        id: number,
        file: string,
        originalFilename: string,
        type: string
      }[],
      productImages: {
        file: string,
        path: string,
      }[],
      representativeImage: {
        file: string[],
        path: string | undefined
      },
      standardImages: {
        file: string,
        path: string
      }[]
    }
  },
};

const ProductFormInitialState: productFormInitialState = {
  productContent: {
    category: '',
    description: '',
    productName: '',
    files: {
      docFiles: [],
      productImages: [],
      representativeImage: {
        file: [],
        path: undefined
      },
      standardImages: []
    }
  },
};

export const ProductFormSlice = createSlice({
  name: 'productForm',
  initialState: ProductFormInitialState,
  reducers: {
    getProductContent: (
      state,
      action: PayloadAction<{
        detail: {
          category: string,
          description: string,
          files: {
            docFiles: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string,
              type: string
            }[],
            productImages: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            }[],
            representativeImage: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            },
            standardImages: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            }[]
          },
          id: number,
          productName: string
        }
      }>
    ) => {
      const newProductContent = {
        ...state.productContent,
        category: action.payload.detail.category,
        description: action.payload.detail.description,
        productName: action.payload.detail.productName
      };
      state.productContent = newProductContent;
    },
    addProductName: (
      state,
      action: PayloadAction<{ productName: string }>
    ) => {
      state.productContent.productName = action.payload.productName
    },
    addProductDescription: (
      state,
      action: PayloadAction<{ description: string }>
    ) => {
      state.productContent.description = action.payload.description
    },
    addProductCategory: (
      state,
      action: PayloadAction<{ category: string }>
    ) => {
      state.productContent.category = action.payload.category
    },
    addRepProductImage: (
      state,
      action: PayloadAction<{ repProduct: { file: string, path: string } }>
    ) => {
      const newFile = {file: [action.payload.repProduct.file], path: action.payload.repProduct.path};
      state.productContent.files.representativeImage = newFile;
    },
    addProductImage: (
      state,
      action: PayloadAction<{ product: { file: string, path: string } }>
    ) => {
      const newFile = [...state.productContent.files.productImages, action.payload.product];
      state.productContent.files.productImages = newFile;
    },
    deleteProductImage: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const newFile = state.productContent.files.productImages.filter((value, index) => index !== action.payload.index);
      state.productContent.files.productImages = newFile;
    },
    addStandardImage: (
      state,
      action: PayloadAction<{ standard: { file: string, path: string } }>
    ) => {
      const newFile = [...state.productContent.files.standardImages, action.payload.standard];
      state.productContent.files.standardImages = newFile;
    },
    deleteStandardImage: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const newFile = state.productContent.files.standardImages.filter((value, index) => index !== action.payload.index);
      state.productContent.files.standardImages = newFile;
    },
    addProductDocType: (
      state,
      action: PayloadAction<{ id: Number, type: string }>
    ) => {
      const newFile = state.productContent.files.docFiles.map(item => {
        if (item.id === action.payload.id) {
          return {...item, type: action.payload.type}
        }
        return item;
      })
      state.productContent.files.docFiles = newFile;
    },
    addProductDoc: (
      state,
      action: PayloadAction<{
        id: number,
        productDoc: {
          file: string,
          originalFilename: string
        }
      }>
    ) => {
      const newFile = state.productContent.files.docFiles.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            file: action.payload.productDoc.file,
            originalFilename: action.payload.productDoc.originalFilename
          }
        }
        return item;
      })
      state.productContent.files.docFiles = newFile;
    },

    deleteProductDoc: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const newFile = state.productContent.files.docFiles.map(item => {
        if (item.id === action.payload.id) {
          return {...item, originalFilename: '', file: ''}
        }
        return item;
      })
      state.productContent.files.docFiles = newFile;
    },
    addProductDocUploadButton: (state) => {
      const fileLen = state.productContent.files.docFiles['length'];
      if (fileLen === 0) {
        const newFile = [{
          id: 0,
          file: '',
          originalFilename: '',
          type: ''
        }];
        state.productContent.files.docFiles = newFile;
      } else {
        const newFile = [...state.productContent.files.docFiles, {
          id: state.productContent.files.docFiles[fileLen - 1].id + 1,
          file: '',
          originalFilename: '',
          type: ''
        }];
        state.productContent.files.docFiles = newFile;
      }
    },
    deleteProductDocUploadButton: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const newFile = state.productContent.files.docFiles.filter((item, index) => index !== action.payload.index);
      state.productContent.files.docFiles = newFile;
    },
    resetProductForm: (state) => {
      state.productContent = {
        category: '',
        description: '',
        productName: '',
        files: {
          docFiles: [],
          productImages: [],
          representativeImage: {
            file: [],
            path: undefined
          },
          standardImages: []
        }
      }
    },
  }
});

export const {
  getProductContent,
  addProductName,
  addProductDescription,
  addProductCategory,
  addRepProductImage,
  addProductImage,
  deleteProductImage,
  addStandardImage,
  deleteStandardImage,
  addProductDocType,
  addProductDoc,
  deleteProductDoc,
  addProductDocUploadButton,
  deleteProductDocUploadButton,
  resetProductForm
} = ProductFormSlice.actions;
export default ProductFormSlice.reducer;