import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 제품 등록

/**
 * productContent : 제품 정보
 * productRepPath : 대표 제품 이미지 경로 (미리보기)
 * productPath : 제품 이미지 경로 리스트 (미리보기)
 * standardPath : 규격 이미지 경로 리스트 (미리보기)
 * productImage : 전송할 제품 이미지 정보
 * productRepImage : 전송할 대표 제품 이미지 정보
 * standardImage :  전송할 규격 이미지 정보
 * productFileName : 제품 첨부파일 이름-버튼에 넣을 자료 (미리보기)
 * productFile : 전송할 제품 첨부파일 데이터
 */

/**
 * updateProductName : 제품 이름 입력
 * updateProductDescription : 제품 설명 입력
 * updateProductCategory : 제품 카테고리 선택
 * updateRepProductImage : 전송할 대표 제품 이미지 추가
 * deleteRepProductImage : 전송할 대표 제품 이미지 삭제
 * updateProductImage : 전송할 제품 이미지 추가
 * deleteProductImage : 전송할 제품 이미지 삭제
 * updateGradeImage : 전송할 규격 이미지 추가
 * deleteGradeImage : 전송할 규격 이미지 삭제
 * addRepProductImagePath : 대표 제품 사진 추가 (미리보기)
 * deleteRepProductImagePath : 대표 제품 사진 삭제 (미리보기)
 * addProductImagePath : 제품 사진 추가 (미리보기)
 * deleteProductImagePath : 제품 사진 삭제 (미리보기)
 * addGradeImagePath : 규격 사진 추가 (미리보기)
 * deleteGradeImagePath : 규격 사진 삭제 (미리보기)
 * addProductFile : 제품 파일 업로드
 * deleteProductFileName : 제품 파일 삭제
 * addProductUploadButton : 제품 업로드 버튼 추가
 * deleteProductUploadButton : 제품 업로드 버튼 삭제
 * updateProductFile: 전송할 제품 파일 추가
 * deleteProductFile: 전송할 제품 파일 삭제
 */

interface productFormInitialState {
  productContent: {
    name: string,
    description: string,
    categoryName: string
  },
  productRepPath: string | undefined,
  productPath: string[],
  standardPath: string[],
  productImage: string[],
  productRepImage: string,
  standardImage: string[],
  productFileName: { key: number, name: string | undefined }[] | [],
  productFile: string[]
};

const ProductFormInitialState: productFormInitialState = {
  productContent: { name: '', description: '', categoryName: '' },
  productRepPath: undefined,
  productPath: [],
  standardPath: [],
  productImage: [],
  productRepImage: '',
  standardImage: [],
  productFileName: [{ key: 0, name: undefined }],
  productFile: []
};

export const ProductFormSlice = createSlice({
  name: 'productForm',
  initialState: ProductFormInitialState,
  reducers: {
    updateProductName: (
      state,
      action: PayloadAction<{ name: string }>
    ) => { state.productContent.name = action.payload.name },
    updateProductDescription: (
      state,
      action: PayloadAction<{ description: string }>
    ) => { state.productContent.description = action.payload.description },
    updateProductCategory: (
      state,
      action: PayloadAction<{ categoryName: string }>
    ) => { state.productContent.categoryName = action.payload.categoryName },
    updateRepProductImage: (
      state,
      action: PayloadAction<{ file: string }>
    ) => { state.productRepImage = action.payload.file },
    deleteRepProductImage: (state) => { state.productRepImage = '' },
    updateProductImage: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.productImage, action.payload.file];
      state.productImage = newFile;
    },
    deleteProductImage: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.productImage.filter((value, index) => index !== action.payload.num);
      state.productImage = newFile;
    },
    updateGradeImage: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.standardImage, action.payload.file];
      state.standardImage = newFile;
    },
    deleteGradeImage: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.standardImage.filter((value, index) => index !== action.payload.num);
      state.standardImage = newFile;
    },
    addRepProductImagePath: (
      state,
      action: PayloadAction<{ item: string }>
    ) => { state.productRepPath = action.payload.item },
    deleteRepProductImagePath: (state) => { state.productRepPath = undefined },
    addProductImagePath: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newPath = [...state.productPath, action.payload.item];
      state.productPath = newPath;
    },
    deleteProductImagePath: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newPath = state.productPath.filter((path, index) => index !== action.payload.num);
      state.productPath = newPath;
    },
    addGradeImagePath: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      const newPath = [...state.standardPath, action.payload.item];
      state.standardPath = newPath;
    },
    deleteGradeImagePath: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newPath = state.standardPath.filter((path, index) => index !== action.payload.num)
      state.standardPath = newPath;
    },
    addProductFile: (
      state,
      action: PayloadAction<{ key: number, item: string }>
    ) => {
      const newFile = state.productFileName.map(value => {
        if (value.key === action.payload.key) {
          return { ...value, name: action.payload.item }
        }
        return value;
      })
      state.productFileName = newFile;
    },
    deleteProductFileName: (
      state,
      action: PayloadAction<{ key: number }>
    ) => {
      const newFile = state.productFileName.map(value => {
        if (value.key === action.payload.key) {
          return { ...value, name: '' }
        }
        return value;
      })
      state.productFileName = newFile;
    },
    addProductUploadButton: (state) => {
      const fileLen = state.productFileName['length'];
      const newFile = [...state.productFileName, { key: state.productFileName[fileLen - 1].key + 1, name: '' }];
      state.productFileName = newFile;
    },
    deleteProductUploadButton: (
      state,
      action: PayloadAction<{ key: number }>
    ) => {
      const newFile = state.productFileName.filter((item, index) => index !== action.payload.key);
      state.productFileName = newFile;
    },
    updateProductFile: (
      state,
      action: PayloadAction<{ file: string }>
    ) => {
      const newFile = [...state.productFile, action.payload.file];
      state.productFile = newFile;
    },
    deleteProductFile: (
      state,
      action: PayloadAction<{ num: number }>
    ) => {
      const newFile = state.productFile.filter((file, index) => index !== action.payload.num);
      state.productFile = newFile;
    }
  }
});

export const {
  updateProductName,
  updateProductDescription,
  updateProductCategory,
  updateRepProductImage,
  deleteRepProductImage,
  updateProductImage,
  deleteProductImage,
  updateGradeImage,
  deleteGradeImage,
  addRepProductImagePath,
  deleteRepProductImagePath,
  addProductImagePath,
  deleteProductImagePath,
  addGradeImagePath,
  deleteGradeImagePath,
  addProductFile,
  deleteProductFileName,
  addProductUploadButton,
  deleteProductUploadButton,
  updateProductFile,
  deleteProductFile } = ProductFormSlice.actions;
export default ProductFormSlice.reducer;