import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Location {
  id: number;
  name: string;
}

export interface Locations {
  selectedLocation: Location;
  saved: Location[];
}

const initialState: Locations = {
  selectedLocation: {id: 0, name: 'London, UK'},
  saved: [
    {id: 0, name: 'London, UK'},
    {id: 1, name: 'Visaginas, Lithuania'},
    {id: 2, name: 'Manchester, UK'},
    {id: 3, name: 'Paris, France'},
    {id: 4, name: 'Block, Africa'},
    {id: 5, name: 'Bangkok, Thailand'},
  ],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    selectLocation: (state, {payload: location}: PayloadAction<Location>) => {
      state.selectedLocation = location;
    },
  },
});

export const {actions, reducer} = locationsSlice;
