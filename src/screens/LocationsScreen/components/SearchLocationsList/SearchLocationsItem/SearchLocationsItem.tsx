import {Suggestion} from '../../../../../types/hereAPI.types';
import {Text} from '../../../../../components';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useStyles} from './SearchLocationsItem.styles';
import {TouchableOpacity, View} from 'react-native';

interface SearchLocationsItemProps {
  index: number;
  item: Suggestion;
  lastItemIndex: number;
  handleLocationPressed: (item: Suggestion) => void;
}

const SearchLocationsItem: React.FC<SearchLocationsItemProps> = ({
  item,
  index,
  lastItemIndex,
  handleLocationPressed,
}) => {
  const styles = useStyles();

  const isLastItem = index === lastItemIndex;

  return (
    <Animated.View
      style={styles.mainContainer}
      entering={FadeIn}
      exiting={FadeOut.duration(100)}>
      <TouchableOpacity onPress={() => handleLocationPressed(item)}>
        <Text fontSize={14} style={styles.labelText}>
          {item.label}
        </Text>
      </TouchableOpacity>
      {!isLastItem && <View style={styles.separatorLine} />}
    </Animated.View>
  );
};

export default SearchLocationsItem;
