import React, {useState} from 'react';
import {View} from 'react-native';
import {SearchBar} from '../../components';
import {useStyles} from './LocationsScreen.styles';
import {SearchLocationsList} from './components/SearchLocationsList';
import {useDebounce} from '../../hooks/useDebounce';

const LocationsScreen: React.FC = () => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  return (
    <View style={styles.root}>
      <View style={styles.searchContainer}>
        <SearchBar setSearchValue={setSearchValue} />
      </View>
      <SearchLocationsList
        debouncedSearchTerm={debouncedSearchTerm}
        searchTerm={searchValue}
      />
    </View>
  );
};

export default LocationsScreen;
