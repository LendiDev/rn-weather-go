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
    {id: 1, name: 'Paris, Francee'},
    {id: 2, name: 'Paris, Frances'},
    {id: 3, name: 'Paris, Francesd'},
    {id: 4, name: 'Paris, Francesd'},
    {id: 5, name: 'Paris, Francedsds'},
  ],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    selectLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const {actions, reducer} = locationsSlice;