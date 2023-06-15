import SearchLocationsItem from './SearchLocationsItem/SearchLocationsItem';
import Animated, {Layout} from 'react-native-reanimated';
import {useStyles} from './SearchLocationsList.styles';
import {Text, View} from 'react-native';
import {useGetLocationsQuery} from '../../../../store/api/locationSuggestions.api';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

interface SearchLocationsListProps {
  debouncedSearchTerm: string;
}

const SearchLocationsList: React.FC<SearchLocationsListProps> = ({
  debouncedSearchTerm,
}) => {
  const styles = useStyles();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('dismounted');
    });

    return unsubscribe;
  }, [navigation]);

  const {data: locations, error} = useGetLocationsQuery(debouncedSearchTerm);

  const suggestions = locations?.suggestions || [];
  const lastItemIndex = suggestions.length - 1;

  return (
    <View style={styles.contentContainer}>
      {error && <Text>{error.toString()}</Text>}
      <Animated.FlatList
        itemLayoutAnimation={Layout.springify().duration(200)}
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
    </View>
  );
};

export default SearchLocationsList;
