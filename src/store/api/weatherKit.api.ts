import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Weather} from '../../types/weather.types';
import {Coordinates} from '../../types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  refetchOnMountOrArgChange: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.18:3000/api/v1/weatherkit',
  }),
  endpoints: builder => ({
    getWeather: builder.query<Weather, Partial<Coordinates>>({
      query: ({latitude, longitude}) => ({
        method: 'GET',
        url: `/${latitude}/${longitude}`,
      }),
    }),
  }),
});

export const {useGetWeatherQuery} = weatherApi;
