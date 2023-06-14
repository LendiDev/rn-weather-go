import {Keyboard, TextInput, TouchableOpacity, View} from 'react-native';
import {useStyles} from './SearchBar.styles';
import {useCallback, useEffect, useState} from 'react';
import Text from '../Text/Text';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';

interface SearchBarProps {
  value?: string;
  setSearchValue?: (searchTerm: string) => void;
  placeholder?: string;
  onPressAction?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  setSearchValue,
  placeholder = 'Search for location',
  onPressAction,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const {isSearching} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const {setIsSearching} = useActions();
  const styles = useStyles();

  const handleSearch = useCallback(
    (text: string) => {
      if (setSearchValue) {
        setSearchValue(text);
      }
      setSearchTerm(text);
    },
    [setSearchValue],
  );

  useEffect(() => {
    if (!isSearching) {
      handleSearch('');
      Keyboard.dismiss();
    }
  }, [handleSearch, isSearching]);

  const handleSearchCancel = () => {
    setIsSearching(false);
  };

  const handleSearchStartEditing = () => {
    setIsSearching(true);
  };

  return (
    <>
      {!onPressAction ? (
        <TextInput
          style={styles.root}
          value={searchTerm}
          placeholder={placeholder}
          onChangeText={handleSearch}
          onFocus={handleSearchStartEditing}
          textContentType="location"
        />
      ) : (
        <>
          <View style={styles.root}>
            <Text>{value}</Text>
          </View>
          <TouchableOpacity style={styles.pressArea} onPress={onPressAction} />
        </>
      )}

      {isSearching && !onPressAction && (
        <View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleSearchCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default SearchBar;
