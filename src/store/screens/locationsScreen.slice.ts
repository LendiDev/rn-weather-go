import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface LocationsScreenState {
  isSearching: boolean;
  isSearchingFromHome: boolean;
}

const initialState: LocationsScreenState = {
  isSearching: false,
  isSearchingFromHome: false,
};

export const locationsScreen = createSlice({
  name: 'locationsScreen',
  initialState,
  reducers: {
    setIsSearching: (state, {payload: isSearching}: PayloadAction<boolean>) => {
      state.isSearching = isSearching;
    },
    setIsSearchingFromHome: (
      state,
      {payload: isSearchingFromHome}: PayloadAction<boolean>,
    ) => {
      state.isSearchingFromHome = isSearchingFromHome;
    },
  },
});

export const {reducer} = locationsScreen;

export const locationsScreenActions = locationsScreen.actions;
