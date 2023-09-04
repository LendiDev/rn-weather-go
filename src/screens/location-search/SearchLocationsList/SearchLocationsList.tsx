import {FlatList, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useEffect, useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {createStyles} from './SearchLocationsList.styles';
import SearchLocationsItem from './SearchLocationsItem/SearchLocationsItem';
import ErrorMessage from './ErrorMessage';
import {useGetLocationsQuery} from '../../../store/api/locationSuggestions.api';
import {KeyboardSpacer} from '../../../components/ui/KeyboardSpacer';

interface SearchLocationsListProps {
  debouncedSearchTerm: string;
  setIsLoading: (loading: boolean) => void;
}

const SearchLocationsList: React.FC<SearchLocationsListProps> = ({
  debouncedSearchTerm,
  setIsLoading,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets), [theme, insets]);

  const {
    isLoading,
    data: locations,
    error,
    isError,
    isFetching,
    refetch,
  } = useGetLocationsQuery(debouncedSearchTerm);

  const suggestions = locations?.suggestions || [];
  const lastItemIndex = suggestions.length - 1;

  useEffect(() => {
    setIsLoading(!isLoading && isFetching);
  }, [isFetching]);

  return (
    <View style={styles.contentContainer}>
      {isError ? (
        <ErrorMessage error={error} onTryAgain={refetch} />
      ) : (
        suggestions.length > 0 &&
        !isFetching && (
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
        )
      )}
      <KeyboardSpacer />
    </View>
  );
};

export default SearchLocationsList;
