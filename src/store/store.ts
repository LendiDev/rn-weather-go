import {
  ThunkMiddleware,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {reducer as locationsReducer} from './locations/locations.slice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import {reduxStorage} from './storage';
import {autocompleteApi} from './api/locationSuggestions.api';
import {geocodeApi} from './api/locationGeocode.api';
import {locationsScreen} from './screens/locationsScreen.slices';

const persistConfig = {
  key: 'root',
  version: 2,
  storage: reduxStorage,
  whitelist: ['locations'],
};
const middlewares: ThunkMiddleware[] = [
  autocompleteApi.middleware,
  geocodeApi.middleware,
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const reducers = combineReducers({
  locations: locationsReducer,
  [autocompleteApi.reducerPath]: autocompleteApi.reducer,
  [geocodeApi.reducerPath]: geocodeApi.reducer,
  screens: combineReducers({
    locationsScreen: locationsScreen.reducer,
  }),
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
