import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Weather} from '../../types/weather.types';
import {Coordinates} from '../../types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v1/weatherkit',
  }),
  endpoints: builder => ({
    getWeather: builder.query<Weather, Coordinates>({
      query: ({latitude, longitude}) => ({
        method: 'GET',
        url: `/${latitude}/${longitude}`,
      }),
    }),
  }),
});

export const {useGetWeatherQuery} = weatherApi;
