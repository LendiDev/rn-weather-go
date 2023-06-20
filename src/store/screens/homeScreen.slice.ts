import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface LocationsScreenState {
  isManualLocationSelection: boolean;
}

const initialState: LocationsScreenState = {
  isManualLocationSelection: false,
};

export const homeScreenSlice = createSlice({
  name: 'homeScreen',
  initialState,
  reducers: {
    setIsManualLocationSelection: (
      state,
      {payload: isManualLocationSelection}: PayloadAction<boolean>,
    ) => {
      state.isManualLocationSelection = isManualLocationSelection;
    },
  },
});

export const {reducer} = homeScreenSlice;

export const homeScreenActions = homeScreenSlice.actions;
