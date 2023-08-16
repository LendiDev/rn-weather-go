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
    addLocationAndSelect: (
      state,
      {payload: location}: PayloadAction<Location>,
    ) => {
      if (!state.saved) {
        state.saved = [];
      }

      const existingLocation = state.saved.find(loc => loc.id === location.id);

      if (existingLocation) {
        state.selectedLocation = existingLocation;
      } else {
        state.saved.push(location);
        state.selectedLocation = location;
      }
    },
    reorderLocations: (
      state,
      {payload: locations}: PayloadAction<Location[]>,
    ) => {
      state.saved = locations;
    },
    removeLocationById: (
      state,
      {payload: locationId}: PayloadAction<string>,
    ) => {
      if (state.selectedLocation?.id === locationId) {
        const index = state.saved.findIndex(
          location => state.selectedLocation?.id === location.id,
        );
        // max index possible after deletion
        const maxIndex = state.saved.length - 1;

        if (maxIndex > 0) {
          // still something to select
          if (maxIndex > index) {
            // select one to the right
            state.selectedLocation = state.saved[index + 1];
          } else {
            // select one to the left
            state.selectedLocation = state.saved[index - 1];
          }
        } else {
          // nothing to select
          state.selectedLocation = undefined;
        }
      }
      state.saved = state.saved.filter(location => location.id !== locationId);
    },
    removeAllLocations: state => {
      state.selectedLocation = undefined;
      state.saved = [];
    },
  },
});

export const {actions, reducer} = locationsSlice;
