import {Keyboard, TextInput, TouchableOpacity, View} from 'react-native';
import {useStyles} from './SearchBar.styles';
import {useCallback, useEffect, useRef, useState} from 'react';
import Text from '../Text/Text';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import {useNavigation} from '@react-navigation/native';
import {LocationsScreenProps} from '../../types';

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
  const {isSearching, isSearchingFromHome} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const navigation = useNavigation<LocationsScreenProps['navigation']>();
  const {setIsSearching, setIsSearchingFromHome} = useActions();
  const styles = useStyles();
  const inputRef = useRef<TextInput>(null);

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
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [handleSearch, isSearching]);

  const handleSearchCancel = () => {
    setIsSearching(false);

    if (isSearchingFromHome) {
      navigation.navigate('Home');
      setIsSearchingFromHome(false);
    }
  };

  const handleSearchStartEditing = () => {
    setIsSearching(true);
  };

  return (
    <>
      {!onPressAction ? (
        <TextInput
          ref={inputRef}
          style={styles.root}
          value={searchTerm}
          placeholder={placeholder}
          onChangeText={handleSearch}
          onFocus={handleSearchStartEditing}
          textContentType="location"
        />
      ) : (
        <>
          <TouchableOpacity style={styles.root} onPress={onPressAction}>
            <Text>{value}</Text>
          </TouchableOpacity>
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
