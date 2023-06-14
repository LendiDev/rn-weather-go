import SearchLocationsItem from './SearchLocationsItem/SearchLocationsItem';
import Animated from 'react-native-reanimated';
import {useStyles} from './SearchLocationsList.styles';
import {Text, View} from 'react-native';
import {useGetLocationsQuery} from '../../../../store/api/locationSuggestions.api';
import {FlatList} from 'react-native-gesture-handler';
import {Suggestion} from '../../../../types/hereAPI.types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Suggestion>);

const MIN_CHARS_START_SEARCH = 2;

interface SearchLocationsListProps {
  searchTerm: string;
  debouncedSearchTerm: string;
}

const SearchLocationsList: React.FC<SearchLocationsListProps> = ({
  debouncedSearchTerm,
  searchTerm,
}) => {
  const styles = useStyles();

  const {data: locations, error} = useGetLocationsQuery(debouncedSearchTerm, {
    skip:
      searchTerm.length <= MIN_CHARS_START_SEARCH &&
      debouncedSearchTerm.length <= MIN_CHARS_START_SEARCH &&
      debouncedSearchTerm !== searchTerm,
  });

  const suggestions =
    searchTerm.length >= MIN_CHARS_START_SEARCH
      ? locations?.suggestions || []
      : [];

  const lastItemIndex = suggestions.length - 1;

  return (
    <View>
      {error && <Text>{error.toString()}</Text>}
      {suggestions && (
        <AnimatedFlatList
          contentContainerStyle={styles.contentContainer}
          keyExtractor={item => item.locationId}
          data={suggestions}
          renderItem={({item, index}) => (
            <SearchLocationsItem
              index={index}
              item={item}
              lastItemIndex={lastItemIndex}
            />
          )}
        />
      )}
    </View>
  );
};

export default SearchLocationsList;
