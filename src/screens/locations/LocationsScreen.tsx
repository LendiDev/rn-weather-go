import * as NavigationService from 'react-navigation-helpers';
import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';

import {LocationsList} from './components';
import {createStyles} from './LocationsScreen.styles';
import {SCREENS} from '../../shared/screens';

const LocationsScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      <LocationsList />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          NavigationService.navigate(SCREENS.LOCATION_SEARCH);
        }}>
        <FeatherIcon size={24} color={'white'} name="plus" />
      </TouchableOpacity>
    </>
  );
};

export default LocationsScreen;
