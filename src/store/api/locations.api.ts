import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {HereLocationSuggestions} from '../../types/locations.types';
import {LOCATION_AUTOCOMPLETE_API_URL, HERE_API_KEY} from '@env';
import {REHYDRATE} from 'redux-persist';

if (!LOCATION_AUTOCOMPLETE_API_URL) {
  throw Error('env LOCATION_AUTOCOMPLETE_API_URL not set');
}
if (!HERE_API_KEY) {
  throw Error('env HERE_API_KEY not set');
}

export const autocompleteApi = createApi({
  reducerPath: 'locationAutocomplete',
  tagTypes: ['autocomplete'],
  baseQuery: fetchBaseQuery({
    baseUrl: LOCATION_AUTOCOMPLETE_API_URL,
  }),
  keepUnusedDataFor: 3600,
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    getLocations: builder.query<HereLocationSuggestions, string>({
      query: searchTerm => ({
        url: `/suggest.json?query=${searchTerm}`,
        method: 'GET',
        params: {
          apiKey: HERE_API_KEY,
          language: 'en',
          maxresults: 10,
        },
      }),
      transformResponse: (response: HereLocationSuggestions) => {
        if (!response.suggestions) {
          response.suggestions = [];
        }

        // Remove similar locations duplicates
        response.suggestions = response.suggestions.filter(
          (tag, index, array) =>
            array.findIndex(
              t =>
                (t.address.country === tag.address.country &&
                  t.address.county === tag.address.county) ||
                t.address.postalCode === tag.address.postalCode ||
                t.address.state === tag.address.state,
            ) === index,
        );

        response.suggestions.forEach(location => {
          // reverse display name so it goes city, district, postalCode, country...
          const reversedLocationLabelArray = location.label
            .split(', ')
            .reverse();

          // removes duplicates so there is no repetition of the same city and etc...
          const removeDuplicates = Array.from(
            new Set(reversedLocationLabelArray),
          );
          location.label = removeDuplicates.join(', ');
        });
        return response;
      },
      providesTags: () => ['autocomplete'],
    }),
  }),
});

export const {useGetLocationsQuery, util} = autocompleteApi;
