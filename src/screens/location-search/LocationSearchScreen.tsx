import {View} from 'react-native';
import {SearchBar} from '../../components';
import {SearchLocationsList} from '../locations/components';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useDebounce} from '../../hooks/useDebounce';
import {MARGIN_HORIZONTAL} from '../../shared/constants';
import {useState} from 'react';
import {useSafeAreaStyles} from '../../hooks/useSafeAreaStyles';
import {useTheme} from '@react-navigation/native';

const SearchLocationsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const safeAreaStyles = useSafeAreaStyles(true);
  const {colors} = useTheme();

  const searchTerm = useTypedSelector(
    state => state.screens.locationsScreen.searchFor,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return (
    <View style={{...safeAreaStyles}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          maxHeight: 55,
          alignItems: 'center',
          paddingHorizontal: MARGIN_HORIZONTAL,
          borderBottomColor: colors.border,
          borderBottomWidth: 0.5,
        }}>
        <SearchBar isLoading={isLoading} />
      </View>
      <SearchLocationsList
        debouncedSearchTerm={debouncedSearchTerm}
        searchValue={searchTerm}
        setIsLoading={setIsLoading}
      />
    </View>
  );
};

export default SearchLocationsScreen;
