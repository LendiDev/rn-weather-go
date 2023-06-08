import {FlatList} from 'react-native-gesture-handler';
import ListItem from './ListItem/ListItem';
import {useStyles} from './LocationsList.styles';
import {Separator} from '../../../../../components';

export interface Location {
  id: number;
  name: string;
}

const locationsData = [
  {id: 0, name: 'London, UK'},
  {id: 1, name: 'Paris, Francee'},
  {id: 2, name: 'Paris, Frances'},
  {id: 3, name: 'Paris, Francesd'},
  {id: 4, name: 'Paris, Francesd'},
  {id: 5, name: 'Paris, Francedsds'},
];

const LocationsList = () => {
  const styles = useStyles();

  return (
    <FlatList
      style={styles.root}
      contentContainerStyle={styles.contentContainer}
      data={locationsData}
      renderItem={({item, index}) => <ListItem item={item} index={index} />}
      horizontal={true}
      ItemSeparatorComponent={() => Separator({width: 5})}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LocationsList;
