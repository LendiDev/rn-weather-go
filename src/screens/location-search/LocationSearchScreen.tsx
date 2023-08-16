import {View} from 'react-native';
import {SearchBar} from '../../components';
import {SearchLocationsList} from '../locations/components';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useDebounce} from '../../hooks/useDebounce';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MARGIN_HORIZONTAL} from '../../shared/constants';
import {useState} from 'react';

const SearchLocationsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchTerm = useTypedSelector(
    state => state.screens.locationsScreen.searchFor,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          maxHeight: 55,
          alignItems: 'center',
          paddingHorizontal: MARGIN_HORIZONTAL,
          borderBottomColor: '#ECECEC',
          borderBottomWidth: 1,
        }}>
        <SearchBar isLoading={isLoading} />
      </View>
      <SearchLocationsList
        debouncedSearchTerm={debouncedSearchTerm}
        searchValue={searchTerm}
        isSearching={true}
        setIsLoading={setIsLoading}
      />
    </SafeAreaView>
  );
};

export default SearchLocationsScreen;
