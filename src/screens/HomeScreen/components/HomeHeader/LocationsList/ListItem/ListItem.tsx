import {Text} from '../../../../../../components';
import {useStyles} from './ListItem.styles';
import {useTypedSelector} from '../../../../../../hooks/useTypedSelector';
import {TouchableOpacity} from 'react-native';
import {useActions} from '../../../../../../hooks/useActions';
import {Location} from '../../../../../../types';

const ListItem: React.FC<{item: Location; index: number}> = ({item}) => {
  const styles = useStyles();
  const selectedLocation = useTypedSelector(
    state => state.locations.selectedLocation,
  );
  const {selectLocation} = useActions();

  const handleLocationSelection = () => {
    selectLocation(item);
  };

  const isSelected = item.id === selectedLocation?.id;

  return (
    <TouchableOpacity
      style={[styles.root, isSelected && styles.active]}
      onPress={handleLocationSelection}
      disabled={isSelected}>
      <Text>{item.displayName}</Text>
    </TouchableOpacity>
  );
};

export default ListItem;
