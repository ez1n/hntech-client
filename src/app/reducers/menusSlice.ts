import { createSlice } from "@reduxjs/toolkit";

interface menuInitialState {
  company: boolean,
  product: boolean,
  archive: boolean,
  service: boolean,
};

const MenuInitialState: menuInitialState = {
  company: false,
  product: false,
  archive: false,
  service: false,
};

export const MenuSlice = createSlice({
  name: 'menu',
  initialState: MenuInitialState,
  reducers: {
    mouseOverCompany: (state) => { state.company = true },
    mouseLeaveCompany: (state) => { state.company = false },
    mouseOverProduct: (state) => { state.product = true },
    mouseLeaveProduct: (state) => { state.product = false },
    mouseOverArchive: (state) => { state.archive = true },
    mouseLeaveArchive: (state) => { state.archive = false },
    mouseOverService: (state) => { state.service = true },
    mouseLeaveService: (state) => { state.service = false }
  }
});

export const {
  mouseOverCompany,
  mouseLeaveCompany,
  mouseOverProduct,
  mouseLeaveProduct,
  mouseOverArchive,
  mouseLeaveArchive,
  mouseOverService,
  mouseLeaveService } = MenuSlice.actions;
export default MenuSlice.reducer;