import { createSlice } from "@reduxjs/toolkit";

// 회사소개 하위메뉴 state
interface modeInitialState {
  mode: string
};

const ModeInitialState: modeInitialState = {
  mode: 'INTRODUCE'
};

// 회사소개 카테고리(컴포넌트 교체) 업데이트
export const ModeSlice = createSlice({
  name: 'mode',
  initialState: ModeInitialState,
  reducers: {
    clickChangeIntroduce: state => { state.mode = 'INTRODUCE' },
    clickChangeHistory: state => { state.mode = 'HISTORY' },
    clickChangeOrgChart: state => { state.mode = 'CHART' },
    clickChangeInfo: state => { state.mode = 'INFORMATION' },
    clickChangeLocation: state => { state.mode = 'LOCATION' }
  }
});

export const { clickChangeIntroduce, clickChangeHistory, clickChangeOrgChart, clickChangeInfo, clickChangeLocation } = ModeSlice.actions;
export default ModeSlice.reducer;