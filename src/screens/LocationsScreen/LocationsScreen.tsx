import * as NavigationService from 'react-navigation-helpers';
import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {LocationsList} from './components/';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {createStyles} from './LocationsScreen.styles';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SCREENS} from '../../shared/screens';

const LocationsScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);

  return (
    <>
      <LocationsList />
      <TouchableOpacity
        style={{
          position: 'absolute',
          flex: 1,
          bottom: 16,
          right: 16,
          zIndex: 200,
          height: 55,
          width: 55,
          backgroundColor: '#397CF5',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          elevation: 4,
        }}
        onPress={() => {
          NavigationService.navigate(SCREENS.LOCATION_SEARCH);
        }}>
        <FeatherIcon size={24} color={'white'} name="plus" />
      </TouchableOpacity>
    </>
  );
};

export default LocationsScreen;
