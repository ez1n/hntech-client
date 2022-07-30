import { createSlice } from "@reduxjs/toolkit";

interface companyState {
  value: boolean
};
interface productState {
  value: boolean
};
interface serviceState {
  value: boolean
};

const CompanyInitialState: companyState = {
  value: false
};
const ProductInitialState: productState = {
  value: false
};
const ServiceInitialState: serviceState = {
  value: false
};

export const CompanySlice = createSlice({
  name: 'company',
  initialState: CompanyInitialState,
  reducers: {
    mouseOverCompany: (state) => {
      state.value = true
    },
    mouseLeaveCompany: (state) => {
      state.value = false
    },
  }
});

export const ProductSlice = createSlice({
  name: 'product',
  initialState: ProductInitialState,
  reducers: {
    mouseOverProduct: (state) => {
      state.value = true
    },
    mouseLeaveProduct: (state) => {
      state.value = false
    },
  }
});

export const ServiceSlice = createSlice({
  name: 'service',
  initialState: ServiceInitialState,
  reducers: {
    mouseOverService: (state) => {
      state.value = true
    },
    mouseLeaveService: (state) => {
      state.value = false
    },
  }
});

export const { mouseOverCompany, mouseLeaveCompany } = CompanySlice.actions;
export const { mouseOverProduct, mouseLeaveProduct } = ProductSlice.actions;
export const { mouseOverService, mouseLeaveService } = ServiceSlice.actions;