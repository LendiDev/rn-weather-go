import {View} from 'react-native';
import {Text} from '../../../../../../components';
import {Location} from '../LocationsList';
import {useStyles} from './ListItem.styles';

const ListItem = ({item, index}: {item: Location; index: number}) => {
  const styles = useStyles();

  return (
    <View style={[styles.root, item.id === 1 && styles.active]}>
      <Text>
        {index} {item.name}
      </Text>
    </View>
  );
};

export default ListItem;
