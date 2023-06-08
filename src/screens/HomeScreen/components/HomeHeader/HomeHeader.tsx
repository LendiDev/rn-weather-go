import {View} from 'react-native';
import {useStyles} from './HomeHeader.styles';
import {SearchBar} from '../../../../components';
import LocationsList from './LocationsList/LocationsList';

export const HomeHeader = () => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <View style={styles.halfContainer}>
        <SearchBar />
      </View>
      <View style={styles.halfContainer}>
        <LocationsList />
      </View>
    </View>
  );
};
