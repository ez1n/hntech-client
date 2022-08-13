import { createSlice } from "@reduxjs/toolkit";

// 메뉴

/**
 * company : 회사소개
 * product : 제품소개
 * archive : 자료실
 * service : 고객지원
 */

/** 하위메뉴
 * mouseOverCompany : 회사소개 open
 * mouseLeaveCompany : 회사소개 close
 * mouseOverProduct : 제품소개 open
 * mouseLeaveProduct : 제품소개 close
 * mouseOverArchive : 자료실 open
 * mouseLeaveArchive : 자료실 close
 * mouseOverService : 고객지원 open
 * mouseLeaveService : 고객지원 close
 */

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