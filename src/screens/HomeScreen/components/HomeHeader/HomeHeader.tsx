import {View} from 'react-native';
import {useStyles} from './HomeHeader.styles';
import {SearchBar} from '../../../../components';
import LocationsList from './LocationsList/LocationsList';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import React from 'react';
import {useActions} from '../../../../hooks/useActions';
import {useNavigation} from '@react-navigation/native';

export const HomeHeader: React.FC = () => {
  const styles = useStyles();
  const {selectedLocation} = useTypedSelector(state => state.locations);
  const {setIsSearching} = useActions();
  // TODO fix type
  const navigation = useNavigation();

  const handleSearchBarPress = () => {
    setIsSearching(true);
    navigation.navigate('Locations');
  };

  return (
    <View style={styles.root}>
      <View style={[styles.halfContainer, styles.searchBarContainer]}>
        <SearchBar
          value={selectedLocation?.displayName}
          onPressAction={handleSearchBarPress}
        />
      </View>
      <View style={styles.halfContainer}>
        <LocationsList />
      </View>
    </View>
  );
};
