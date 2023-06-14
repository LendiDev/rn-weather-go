import {Suggestion} from '../../../../../types/locations.types';
import {Text} from '../../../../../components';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useStyles} from './SearchLocationsItem.styles';
import {View} from 'react-native';
import {memo} from 'react';

interface SearchLocationsItemProps {
  index: number;
  item: Suggestion;
  lastItemIndex: number;
}

const SearchLocationsItem: React.FC<SearchLocationsItemProps> = ({
  item,
  index,
  lastItemIndex,
}) => {
  const styles = useStyles();

  const isLastItem = index === lastItemIndex;

  return (
    <Animated.View
      style={styles.mainContainer}
      entering={FadeIn}
      exiting={FadeOut.duration(100)}>
      <Text fontSize={14} style={styles.labelText}>
        {item.label}
      </Text>
      {!isLastItem && <View style={styles.separatorLine} />}
    </Animated.View>
  );
};

export default memo(SearchLocationsItem);
