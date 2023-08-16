import * as NavigationService from 'react-navigation-helpers';
import React, {useEffect, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation, useTheme} from '@react-navigation/native';

import {LocationsList} from './components';
import {createStyles} from './LocationsScreen.styles';
import {SCREENS} from '../../shared/screens';
import {useActions} from '../../hooks/useActions';

const LocationsScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {setIsEditing} = useActions();

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsEditing(false);
    });

    return unsubscribe;
  }, [navigation]);

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
