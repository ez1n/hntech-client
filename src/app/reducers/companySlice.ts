import { createSlice } from "@reduxjs/toolkit";

interface modeInitialState {
  mode: string
};

const ModeInitialState: modeInitialState = {
  mode: 'COMPANY'
};

export const ModeSlice = createSlice({
  name: 'mode',
  initialState: ModeInitialState,
  reducers: {
    clickChangeCompany: state => { state.mode = 'COMPANY' },
    clickChangeIntroduce: state => { state.mode = 'INTRODUCE' },
    clickChangeHistory: state => { state.mode = 'HISTORY' },
    clickChangeOrgChart: state => { state.mode = 'CHART' },
    clickChangeInfo: state => { state.mode = 'INFORMATION' },
    clickChangeLocation: state => { state.mode = 'LOCATION' }
  }
});

export const { clickChangeCompany, clickChangeIntroduce, clickChangeHistory, clickChangeOrgChart, clickChangeInfo, clickChangeLocation } = ModeSlice.actions;
export default ModeSlice.reducer;