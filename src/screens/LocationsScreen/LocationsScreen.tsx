import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {Header, SearchBar} from '../../components';
import {LocationsList, SearchLocationsList} from './components/';
import {useDebounce} from '../../hooks/useDebounce';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import {TITLE_ROW_HEIGHT} from '../../components/Header/Header';
import {createStyles} from './LocationsScreen.styles';
import {useScrollHeaderHandler} from '../../components/Header/useScrollHeaderHandler';
import {LocationsListProps} from './components/LocationsList/LocationsList';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LocationsScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);

  const [searchValue, setSearchValue] = useState<string>('');
  const {isSearching} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  // Scroll handling
  const scrollY = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<LocationsListProps>>();
  const snapPoints: [number, number] = [0, TITLE_ROW_HEIGHT];

  const {onScrollHandler} = useScrollHeaderHandler(scrollY, ref, snapPoints);
  // Scroll handling end

  return (
    <View style={styles.mainContainer}>
      <Header title="Locations" scrollY={scrollY}>
        <View style={styles.searchContainer}>
          <SearchBar setSearchValue={setSearchValue} />
        </View>
      </Header>
      <SearchLocationsList
        debouncedSearchTerm={debouncedSearchTerm}
        searchValue={searchValue}
        isSearching={isSearching}
      />
      <LocationsList ref={ref} onScrollHandler={onScrollHandler} />
    </View>
  );
};

export default LocationsScreen;
