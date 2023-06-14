import {Location} from '../../types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Locations {
  selectedLocation?: Location;
  saved: Location[];
}

const initialState: Locations = {
  selectedLocation: undefined,
  saved: [],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    selectLocation: (state, {payload: location}: PayloadAction<Location>) => {
      state.selectedLocation = location;
    },
    addLocation: (state, {payload: location}: PayloadAction<Location>) => {
      state.saved.push(location);
      state.selectedLocation = location;
    },
    removeAllLocations: state => {
      state.selectedLocation = undefined;
      state.saved = [];
    },
  },
});

export const {actions, reducer} = locationsSlice;
