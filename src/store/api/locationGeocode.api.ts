import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HereLocationGeocode} from '../../types/hereAPI.types';
import {LOCATION_GEOCODE_API_URL, HERE_API_KEY} from '@env';
import {REHYDRATE} from 'redux-persist';
import {Coordinates} from '../../types/location.types';

if (!LOCATION_GEOCODE_API_URL) {
  throw Error('env LOCATION_GEOCODE_API_URL not set');
}

export const geocodeApi = createApi({
  reducerPath: 'locationGeocode',
  tagTypes: ['geocode'],
  baseQuery: fetchBaseQuery({
    baseUrl: LOCATION_GEOCODE_API_URL,
  }),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    getLocationCoordinates: builder.query<Coordinates, string>({
      query: locationId => ({
        url: '/geocode.json',
        method: 'GET',
        params: {
          apiKey: HERE_API_KEY,
          locationid: locationId,
          language: 'en',
          gen: 9,
          jsonattributes: 1,
        },
      }),
      transformResponse: ({response}: HereLocationGeocode) => {
        const {latitude, longitude} =
          response.view[0].result[0].location.displayPosition;

        return {latitude, longitude};
      },
      providesTags: () => ['geocode'],
    }),
  }),
});

export const {useLazyGetLocationCoordinatesQuery} = geocodeApi;
