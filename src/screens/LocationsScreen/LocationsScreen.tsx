import React, {useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from '../../components';
import {useStyles} from './LocationsScreen.styles';
import {LocationsList, SearchLocationsList} from './components/';
import {useDebounce} from '../../hooks/useDebounce';
import {useTypedSelector} from '../../hooks/useTypedSelector';

const LocationsScreen: React.FC = () => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState<string>('');
  const {isSearching} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  return (
    <View style={styles.root}>
      <View style={styles.searchContainer}>
        <SearchBar setSearchValue={setSearchValue} />
      </View>
      {isSearching ? (
        <SearchLocationsList debouncedSearchTerm={debouncedSearchTerm} />
      ) : (
        <LocationsList />
      )}
    </View>
  );
};

export default LocationsScreen;
