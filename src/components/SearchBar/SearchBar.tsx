import {TextInput, TouchableOpacity} from 'react-native';
import {useStyles} from './SearchBar.styles';
import {useEffect, useState} from 'react';

const SearchBar: React.FC<{
  value?: string;
  placeholder?: string;
  onPressAction?: () => void;
}> = ({value = '', placeholder = 'Search for location', onPressAction}) => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <>
      <TextInput
        style={styles.root}
        value={searchValue}
        onChangeText={setSearchValue}
        placeholder={placeholder}
      />
      {onPressAction && (
        <TouchableOpacity style={styles.pressArea} onPress={onPressAction} />
      )}
    </>
  );
};

export default SearchBar;
