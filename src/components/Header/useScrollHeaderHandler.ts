import {RefObject, useEffect} from 'react';
import Animated, {
  SharedValue,
  scrollTo,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import {LocationsListProps} from '../../screens/locations/components/LocationsList/LocationsList';
import {useTypedSelector} from '../../hooks/useTypedSelector';

export const useScrollHeaderHandler = (
  scrollY: SharedValue<number>,
  ref: RefObject<Animated.FlatList<LocationsListProps>>,
  snapPoints: [number, number],
) => {
  const {isSearching} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const isSearchingEnabled = useSharedValue(false);

  useEffect(() => {
    if (isSearching) {
      isSearchingEnabled.value = false;
    } else {
      isSearchingEnabled.value = true;
    }
  }, [isSearching, isSearchingEnabled]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: ({contentOffset}) => {
      if (isSearchingEnabled.value) {
        scrollY.value = contentOffset.y;
      }
    },
    onEndDrag: ({contentOffset, velocity}) => {
      if (isSearchingEnabled.value) {
        const velocityY = velocity?.y || 0;

        if (scrollY.value >= snapPoints[0] && scrollY.value <= snapPoints[1]) {
          const snapPointY = snapPoint(contentOffset.y, velocityY, snapPoints);

          scrollTo(ref, 0, snapPointY, true);
        }
      }
    },
  });
  return {onScrollHandler};
};
