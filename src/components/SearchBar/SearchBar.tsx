import {
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStyles} from './SearchBar.styles';
import {useState} from 'react';
import Animated, {SlideInRight} from 'react-native-reanimated';
import Text from '../Text/Text';

const CANCEL_BUTTON_ANIMATION_MS = Platform.OS === 'ios' ? 200 : 50;

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
        <Animated.View
          entering={SlideInRight.duration(CANCEL_BUTTON_ANIMATION_MS)}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleSearchCancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
};

export default SearchBar;
