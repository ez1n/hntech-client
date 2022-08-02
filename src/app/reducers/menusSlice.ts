import { createSlice } from "@reduxjs/toolkit";

interface menuInitialState {
  company: boolean,
  product: boolean,
  service: boolean,
};

const MenuInitialState: menuInitialState = {
  company: false,
  product: false,
  service: false,
};

interface managerInitialState {
  managerMode: boolean
};

const ManagerInitialState: managerInitialState = {
  managerMode: false
};

export const MenuSlice = createSlice({
  name: 'menu',
  initialState: MenuInitialState,
  reducers: {
    mouseOverCompany: (state) => { state.company = true },
    mouseLeaveCompany: (state) => { state.company = false },
    mouseOverProduct: (state) => { state.product = true },
    mouseLeaveProduct: (state) => { state.product = false },
    mouseOverService: (state) => { state.service = true },
    mouseLeaveService: (state) => { state.service = false }
  }
});

export const ManagerSlice = createSlice({
  name: 'mode',
  initialState: ManagerInitialState,
  reducers: {
    clickChangeMode: (state) => { state.managerMode = !(state.managerMode) }
  }
});

export const { mouseOverCompany, mouseLeaveCompany, mouseOverProduct, mouseLeaveProduct, mouseOverService, mouseLeaveService } = MenuSlice.actions;
export const { clickChangeMode } = ManagerSlice.actions;