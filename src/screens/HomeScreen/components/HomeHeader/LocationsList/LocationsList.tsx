import {FlatList} from 'react-native-gesture-handler';
import ListItem from './ListItem/ListItem';
import {useStyles} from './LocationsList.styles';
import {Separator} from '../../../../../components';
import {useTypedSelector} from '../../../../../hooks/useTypedSelector';

const LocationsList = () => {
  const styles = useStyles();
  const savedLocations = useTypedSelector(state => state.locations.saved);

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={styles.contentContainer}
      data={savedLocations}
      renderItem={({item, index}) => <ListItem item={item} index={index} />}
      horizontal={true}
      ItemSeparatorComponent={() => Separator({width: 5})}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LocationsList;
