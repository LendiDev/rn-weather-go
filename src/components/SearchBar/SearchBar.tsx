import {TextInput} from 'react-native';
import {useStyles} from './SearchBar.styles';

const SearchBar: React.FC = () => {
  const styles = useStyles();

  return <TextInput style={styles.root} value="Test, UK" />;
};

export default SearchBar;
