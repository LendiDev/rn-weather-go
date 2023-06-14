import SearchLocationsItem from './SearchLocationsItem/SearchLocationsItem';
import Animated from 'react-native-reanimated';
import {useStyles} from './SearchLocationsList.styles';
import {Text, View} from 'react-native';
import {useGetLocationsQuery} from '../../../../store/api/locationSuggestions.api';
import {FlatList} from 'react-native-gesture-handler';
import {Suggestion} from '../../../../types/hereAPI.types';
import {useActions} from '../../../../hooks/useActions';
import {useLazyGetCoordinatesByIdQuery} from '../../../../store/api/locationGeocode.api';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {Location} from '../../../../types';

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
  const {addLocation} = useActions();
  const [getCoordinates] = useLazyGetCoordinatesByIdQuery();
  const {setIsSearching} = useActions();
  // TODO: Fix type
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  const {data: locations, error} = useGetLocationsQuery(debouncedSearchTerm, {
    skip:
      searchTerm.length <= MIN_CHARS_START_SEARCH &&
      debouncedSearchTerm.length <= MIN_CHARS_START_SEARCH &&
      debouncedSearchTerm !== searchTerm,
  });

  const handleLocationPressed = (item: Suggestion) => {
    getCoordinates(item.locationId)
      .unwrap()
      .then(coordinates => {
        const labelArray = item.label.split(', ');
        const displayName = labelArray[0];
        labelArray.shift();
        const additionalInfo = labelArray.join(', ');

        const locationDetails: Location = {
          id: item.locationId,
          displayName,
          additionalInfo,
          coordinates,
        };

        addLocation(locationDetails);
        setIsSearching(false);
        navigation.navigate('Home');
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

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
              handleLocationPressed={handleLocationPressed}
            />
          )}
        />
      )}
    </View>
  );
};

export default SearchLocationsList;
