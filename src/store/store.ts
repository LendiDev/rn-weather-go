import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {reducer as locationsReducer} from './slices/locations.slice';

const reducers = combineReducers({
  locations: locationsReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
