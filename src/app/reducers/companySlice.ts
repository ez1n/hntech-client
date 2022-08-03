import { createSlice } from "@reduxjs/toolkit";

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
    clickChangeIntroduce: state => { state.mode = 'INTRODUCE' },
    clickChangeHistory: state => { state.mode = 'HISTORY' },
    clickChangeOrgChart: state => { state.mode = 'CHART' },
    clickChangeInfo: state => { state.mode = 'INFORMATION' },
    clickChangeLocation: state => { state.mode = 'LOCATION' }
  }
});

export const { clickChangeIntroduce, clickChangeHistory, clickChangeOrgChart, clickChangeInfo, clickChangeLocation } = ModeSlice.actions;
export default ModeSlice.reducer;