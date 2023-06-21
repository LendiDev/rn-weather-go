import {View} from 'react-native';
import {createStyles} from './HomeHeader.styles';
import {SearchBar} from '../../../../components';
import LocationsList from './LocationsList/LocationsList';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';
import React, {useMemo} from 'react';
import {useActions} from '../../../../hooks/useActions';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LocationsScreenProps} from '../../../../types';
import Animated from 'react-native-reanimated';

export const HomeHeader: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);

  const {selectedLocation} = useTypedSelector(state => state.locations);
  const {setIsSearching, setIsSearchingFromHome} = useActions();
  const navigation = useNavigation<LocationsScreenProps['navigation']>();

  const handleSearchBarPress = () => {
    setIsSearching(true);
    setIsSearchingFromHome(true);
    navigation.navigate('Locations');
  };

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.halfContainer, styles.searchBarContainer]}>
        <SearchBar
          value={selectedLocation?.displayName}
          onPressAction={handleSearchBarPress}
        />
      </Animated.View>
      <View style={styles.halfContainer}>
        <LocationsList />
      </View>
    </View>
  );
};
