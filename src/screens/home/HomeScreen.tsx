import {View} from 'react-native';

import {HomeHeader} from './components';
import {Text} from '../../components';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useStyles} from './HomeScreen.styles';
import {useGetWeatherQuery} from '../../store/api/weatherKit.api';
import {useMemo} from 'react';
import {type FetchBaseQueryError} from '@reduxjs/toolkit/query';

export const HomeScreen = () => {
  const styles = useMemo(() => useStyles(), []);
  const {selectedLocation} = useTypedSelector(state => state.locations);

  const {data, isLoading, isFetching, error} = useGetWeatherQuery({
    latitude: selectedLocation?.coordinates.latitude,
    longitude: selectedLocation?.coordinates.longitude,
  });

  console.log('render');

  return (
    <>
      <View style={styles.root}>
        <View>
          {isFetching && <Text>Fetching...</Text>}
          {isLoading && <Text>Loading...</Text>}
          {selectedLocation ? (
            <>
              <Text>
                Selected location: {JSON.stringify(selectedLocation, null, 4)}
              </Text>
              <Text>{data?.currently.temperature}</Text>
            </>
          ) : (
            <Text>No location selected</Text>
          )}
          {error && <Text>{(error as FetchBaseQueryError).status}</Text>}
        </View>
      </View>
      <HomeHeader />
    </>
  );
};
