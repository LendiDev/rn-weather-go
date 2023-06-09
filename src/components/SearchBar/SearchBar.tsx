import {TextInput} from 'react-native';
import {useStyles} from './SearchBar.styles';

const SearchBar: React.FC<{
  value?: string;
  placeholder?: string;
}> = ({value = '', placeholder = 'Search for location'}) => {
  const styles = useStyles();

  return (
    <TextInput style={styles.root} value={value} placeholder={placeholder} />
  );
};

export default SearchBar;
