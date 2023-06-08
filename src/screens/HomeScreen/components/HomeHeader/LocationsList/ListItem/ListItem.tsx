import {Text} from '../../../../../../components';
import {useStyles} from './ListItem.styles';
import {Location} from '../../../../../../store/slices/locations.slice';
import {useTypedSelector} from '../../../../../../hooks/useTypedSelector';
import {TouchableOpacity} from 'react-native';
import {useActions} from '../../../../../../hooks/useActions';

const ListItem = ({item, index}: {item: Location; index: number}) => {
  const styles = useStyles();
  const selectedLocation = useTypedSelector(
    state => state.locations.selectedLocation,
  );
  const {selectLocation} = useActions();

  const handleLocationSelection = () => {
    selectLocation(item);
  };

  return (
    <TouchableOpacity
      style={[styles.root, item.id === selectedLocation.id && styles.active]}
      onPress={handleLocationSelection}
      disabled={item.id === selectedLocation.id}>
      <Text>
        {index} {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ListItem;
