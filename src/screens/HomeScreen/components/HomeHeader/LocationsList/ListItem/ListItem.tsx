import {Text} from '../../../../../../components';
import {createStyles} from './ListItem.styles';
import {useActions} from '../../../../../../hooks/useActions';
import {Location} from '../../../../../../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import {memo, useMemo} from 'react';

interface ListItemProps {
  item: Location;
  selectedLocation?: Location;
}

const ListItem: React.FC<ListItemProps> = ({item, selectedLocation}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
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

export default memo(ListItem);
