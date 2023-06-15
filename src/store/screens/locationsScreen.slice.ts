import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface LocationsScreenState {
  isSearching: boolean;
}

const initialState: LocationsScreenState = {
  isSearching: false,
};

export const locationsScreen = createSlice({
  name: 'locationsScreen',
  initialState,
  reducers: {
    setIsSearching: (state, {payload: isSearching}: PayloadAction<boolean>) => {
      state.isSearching = isSearching;
    },
  },
});

export const {actions, reducer} = locationsScreen;
