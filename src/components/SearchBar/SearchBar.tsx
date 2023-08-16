import * as NavigationService from 'react-navigation-helpers';
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStyles} from './SearchBar.styles';
import {useCallback, useEffect, useRef} from 'react';
import Text from '../Text/Text';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import {SCREENS} from '../../shared/screens';

interface SearchBarProps {
  value?: string;
  setSearchValue?: (searchTerm: string) => void;
  placeholder?: string;
  onPressAction?: () => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  setSearchValue,
  placeholder = 'Search for location',
  onPressAction,
  isLoading = false,
}) => {
  const {isSearchingFromHome} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const searchTerm = useTypedSelector(
    state => state.screens.locationsScreen.searchFor,
  );

  const {setSearchFor: setSearchTerm} = useActions();
  const {setIsSearchingFromHome} = useActions();
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
    inputRef.current?.focus();

    return () => {
      setSearchTerm('');
    };
  }, []);

  const handleSearchCancel = () => {
    if (isSearchingFromHome) {
      NavigationService.navigate(SCREENS.HOME);
      setIsSearchingFromHome(false);
    } else {
      NavigationService.pop();
    }
  };

  return (
    <>
      {!onPressAction ? (
        <>
          <View style={{flex: 1}}>
            <TextInput
              ref={inputRef}
              style={styles.root}
              value={searchTerm}
              autoFocus={true}
              placeholder={placeholder}
              onChangeText={handleSearch}
              textContentType="location"
            />
            {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
          </View>
          <View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleSearchCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.root} onPress={onPressAction}>
            <Text>{value}</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default SearchBar;
