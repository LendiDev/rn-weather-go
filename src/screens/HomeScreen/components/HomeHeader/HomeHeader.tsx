import {View} from 'react-native';
import {useStyles} from './HomeHeader.styles';
import {SearchBar} from '../../../../components';
import LocationsList from './LocationsList/LocationsList';
import {useTypedSelector} from '../../../../hooks/useTypedSelector';

export const HomeHeader = () => {
  const styles = useStyles();
  const {selectedLocation} = useTypedSelector(state => state.locations);

  return (
    <View style={styles.root}>
      <View style={styles.halfContainer}>
        <SearchBar value={selectedLocation.name} />
      </View>
      <View style={styles.halfContainer}>
        <LocationsList />
      </View>
    </View>
  );
};
