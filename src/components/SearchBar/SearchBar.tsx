import {Keyboard, TextInput, TouchableOpacity, View} from 'react-native';
import {useStyles} from './SearchBar.styles';
import {useState} from 'react';
import Text from '../Text/Text';

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
  const [isEditing, setIsEditing] = useState(false);
  const styles = useStyles();

  const handleSearch = (text: string) => {
    if (setSearchValue) {
      setSearchValue(text);
    }

    setSearchTerm(text);
  };

  const handleSearchCancel = () => {
    handleSearch('');
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const handleSearchStartEditing = () => {
    setIsEditing(true);
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

      {isEditing && !onPressAction && (
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
