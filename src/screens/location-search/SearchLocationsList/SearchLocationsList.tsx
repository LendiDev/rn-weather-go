import SearchLocationsItem from './SearchLocationsItem/SearchLocationsItem';
import {FlatList, Text, View} from 'react-native';
import {useGetLocationsQuery} from '../../../store/api/locationSuggestions.api';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {useEffect, useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyles} from './SearchLocationsList.styles';
import {useTypedSelector} from '../../../hooks/useTypedSelector';

interface SearchLocationsListProps {
  debouncedSearchTerm: string;
  searchValue: string;
  isSearching: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SearchLocationsList: React.FC<SearchLocationsListProps> = ({
  debouncedSearchTerm,
  searchValue,
  isSearching,
  setIsLoading,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);

  const {isSearchingFromHome} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const {
    data: locations,
    error,
    isFetching,
  } = useGetLocationsQuery(debouncedSearchTerm);

  const suggestions = locations?.suggestions || [];
  const lastItemIndex = suggestions.length - 1;

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

  return (
    <View
      style={styles.contentContainer}
      pointerEvents={isSearching ? 'auto' : 'none'}>
      {isSearching && (
        <Animated.View
          exiting={FadeOut}
          entering={isSearchingFromHome ? undefined : FadeIn}
          style={styles.backdrop}
        />
      )}
      {error && <Text>{error.toString()}</Text>}
      {searchValue.length > 0 && (
        <Animated.View exiting={FadeOut} style={styles.listContainer}>
          <FlatList
            keyExtractor={item => item.locationId}
            data={suggestions}
            keyboardShouldPersistTaps={'handled'}
            renderItem={({item, index}) => (
              <SearchLocationsItem
                index={index}
                item={item}
                lastItemIndex={lastItemIndex}
              />
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default SearchLocationsList;
