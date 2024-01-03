import {View} from 'react-native';
import {useEffect} from 'react';

import {HomeHeader} from './components';
import {Text} from '../../components';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useStyles} from './HomeScreen.styles';
import {useGetWeatherQuery} from '../../store/api/weatherKit.api';

export const HomeScreen = () => {
  const styles = useStyles();
  const {selectedLocation} = useTypedSelector(state => state.locations);

  if (!selectedLocation?.coordinates) {
    return false;
  }

  const {data, isLoading, isFetching, error} = useGetWeatherQuery({
    latitude: selectedLocation?.coordinates.latitude,
    longitude: selectedLocation?.coordinates.longitude,
  });

  const HomeCards = () => {
    if (isFetching || isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View>
          <Text>{error.error}</Text>
        </View>
      );
    }

    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <View style={styles.root}>
        <HomeCards />
      </View>
      <HomeHeader />
    </>
  );
};
