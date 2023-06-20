import {RefObject} from 'react';
import Animated, {
  SharedValue,
  scrollTo,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import {LocationsListProps} from '../../screens/LocationsScreen/components/LocationsList/LocationsList';

export const useScrollHeaderHandler = (
  scrollY: SharedValue<number>,
  ref: RefObject<Animated.FlatList<LocationsListProps>>,
  snapPoints: [number, number],
) => {
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: ({contentOffset}) => {
      scrollY.value = contentOffset.y;
      console.log(scrollY.value, 'this is why');
    },
    onEndDrag: ({contentOffset, velocity}) => {
      const velocityY = velocity?.y || 0;

      if (scrollY.value >= snapPoints[0] && scrollY.value <= snapPoints[1]) {
        const snapPointY = snapPoint(contentOffset.y, velocityY, snapPoints);

        scrollTo(ref, 0, snapPointY, true);
      }
    },
  });
  return {onScrollHandler};
};
