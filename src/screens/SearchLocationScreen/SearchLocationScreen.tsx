import {View} from 'react-native';
import {SearchBar} from '../../components';
import {SearchLocationsList} from '../LocationsScreen/components';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useDebounce} from '../../hooks/useDebounce';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MARGIN_HORIZONTAL} from '../../shared/constants';

const SearchLocationsScreen = () => {
  const searchTerm = useTypedSelector(
    state => state.screens.locationsScreen.searchFor,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

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
        <SearchBar />
      </View>
      <SearchLocationsList
        debouncedSearchTerm={debouncedSearchTerm}
        searchValue={searchTerm}
        isSearching={true}
      />
    </SafeAreaView>
  );
};

export default SearchLocationsScreen;
