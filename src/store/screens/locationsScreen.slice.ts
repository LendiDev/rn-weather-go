import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface LocationsScreenState {
  searchFor: string;
  isSearching: boolean;
  isSearchingFromHome: boolean;
  isEditing: boolean;
}

const initialState: LocationsScreenState = {
  searchFor: '',
  isSearching: false,
  isSearchingFromHome: false,
  isEditing: false,
};

export const locationsScreen = createSlice({
  name: 'locationsScreen',
  initialState,
  reducers: {
    setSearchFor: (state, {payload: searchFor}: PayloadAction<string>) => {
      state.searchFor = searchFor;
    },
    setIsSearching: (state, {payload: isSearching}: PayloadAction<boolean>) => {
      state.isSearching = isSearching;
    },
    setIsSearchingFromHome: (
      state,
      {payload: isSearchingFromHome}: PayloadAction<boolean>,
    ) => {
      state.isSearchingFromHome = isSearchingFromHome;
    },
    setIsEditing: (state, {payload: isEditing}: PayloadAction<boolean>) => {
      state.isEditing = isEditing;
    },
  },
});

export const {reducer} = locationsScreen;

export const locationsScreenActions = locationsScreen.actions;
