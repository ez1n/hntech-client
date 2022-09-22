import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// 회사소개

/**
 * mode : 회사소개 하위 메뉴 (인사말, 회사연혁, 조직도, CI소개, 찾아오시는 길)
 */

/**
 * clickChangeIntroduce : 인사말 (default)
 * clickChangeHistory : 회사연혁
 * clickChangeOrgChart : 조직도
 * clickChangeInfo : CI소개
 * clickChangeLocation : 찾아오시는 길
 * clickChangeMode : 모바일 버전
 */

interface modeInitialState {
  mode: string
};

const ModeInitialState: modeInitialState = {
  mode: 'INTRODUCE'
};

export const ModeSlice = createSlice({
  name: 'mode',
  initialState: ModeInitialState,
  reducers: {
    clickChangeIntroduce: state => {
      state.mode = 'INTRODUCE'
    },
    clickChangeHistory: state => {
      state.mode = 'HISTORY'
    },
    clickChangeOrgChart: state => {
      state.mode = 'CHART'
    },
    clickChangeInfo: state => {
      state.mode = 'INFORMATION'
    },
    clickChangeLocation: state => {
      state.mode = 'LOCATION'
    },
    clickChangeMode: (
      state,
      action: PayloadAction<{ mode: string }>) => {
      state.mode = action.payload.mode
    }
  }
});

export const {
  clickChangeIntroduce,
  clickChangeHistory,
  clickChangeOrgChart,
  clickChangeInfo,
  clickChangeLocation,
  clickChangeMode
} = ModeSlice.actions;
export default ModeSlice.reducer;