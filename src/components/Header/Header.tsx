import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '..';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PADDING_HORIZONTAL} from '../../constants';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useEffect} from 'react';
import {LocationsListProps} from '../../screens/LocationsScreen/components/LocationsList/LocationsList';

type HeaderProps = {
  title: string;
  children?: React.ReactNode[] | React.ReactNode;
  scrollY?: SharedValue<number>;
  animatedTransformY?: SharedValue<number>;
  flatListRef?: React.RefObject<Animated.FlatList<LocationsListProps>>;
};

export const TITLE_ROW_HEIGHT = 46;
export const LARGE_TITLE_ROW_HEIGHT = 46;
export const TOTAL_HEADER_HEIGHT =
  LARGE_TITLE_ROW_HEIGHT * 2 + TITLE_ROW_HEIGHT;

const Header: React.FC<HeaderProps> = ({title, children, scrollY}) => {
  const insets = useSafeAreaInsets();
  const {isSearching} = useTypedSelector(
    state => state.screens.locationsScreen,
  );

  const storedLargeTitleY = useSharedValue(0);
  const childY = useSharedValue(0);

  useEffect(() => {
    childY.value = isSearching
      ? storedLargeTitleY.value === -TITLE_ROW_HEIGHT
        ? -TITLE_ROW_HEIGHT
        : -TITLE_ROW_HEIGHT * 2
      : 0;
  }, [childY, isSearching, storedLargeTitleY.value]);

  const animatedSearchBarContainerYStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(childY.value, {
            duration: 250,
          }),
        },
      ],
    };
  }, [isSearching]);

  const animatedLargeTitleHeightOnScrollStyle = useAnimatedStyle(() => {
    const scrollYValue = scrollY?.value || 0;
    storedLargeTitleY.value = interpolate(
      scrollYValue,
      [0, LARGE_TITLE_ROW_HEIGHT],
      [0, -LARGE_TITLE_ROW_HEIGHT],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY: storedLargeTitleY.value}],
    };
  });

  const animatedLargeTitleOpacityStyle = useAnimatedStyle(() => {
    const scrollYValue = scrollY?.value || 0;
    const opacity = interpolate(
      scrollYValue,
      [LARGE_TITLE_ROW_HEIGHT / 2, LARGE_TITLE_ROW_HEIGHT / 1.5],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  const animatedTitleOpacityStyle = useAnimatedStyle(() => {
    const scrollYValue = scrollY?.value || 0;

    if (scrollY && !isSearching) {
      const opacity = interpolate(
        scrollYValue,
        [LARGE_TITLE_ROW_HEIGHT / 2, LARGE_TITLE_ROW_HEIGHT],
        [0, 1],
        Extrapolation.CLAMP,
      );
      return {
        opacity,
      };
    }
    return {
      opacity: 0,
    };
  }, [isSearching, scrollY]);

  const styles = StyleSheet.create({
    mainContainer: {
      zIndex: 20,
    },
    statusBar: {
      top: 0,
      width: '100%',
      zIndex: 100,
      height: insets.top,
      backgroundColor: 'white',
    },
    titleText: {
      flex: 2,
      fontSize: 18,
      fontWeight: '600',
      opacity: 0,
      textAlign: 'center',
    },
    titleContainer: {
      zIndex: 4,
      height: TITLE_ROW_HEIGHT,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: PADDING_HORIZONTAL,
      backgroundColor: 'white',
    },
    actionButtonLeft: {
      flex: 1,
    },
    actionButtonRight: {
      flex: 1,
      alignItems: 'flex-end',
    },
    largeTitleContainer: {
      zIndex: 3,
      height: LARGE_TITLE_ROW_HEIGHT,
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    largeTitleText: {fontSize: 32, fontWeight: '800'},
  });

  if (!Array.isArray(children)) {
    return (
      <>
        <View style={styles.statusBar} />
        <Animated.View
          style={[styles.mainContainer, animatedSearchBarContainerYStyle]}>
          <Animated.View style={[styles.titleContainer]}>
            <TouchableOpacity style={styles.actionButtonLeft} />
            <Animated.Text
              style={[styles.titleText, animatedTitleOpacityStyle]}>
              {title}
            </Animated.Text>
            <TouchableOpacity style={styles.actionButtonRight}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.largeTitleContainer,
              animatedLargeTitleHeightOnScrollStyle,
            ]}>
            <Animated.Text
              style={[styles.largeTitleText, animatedLargeTitleOpacityStyle]}>
              {title}
            </Animated.Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.largeTitleContainer,
              animatedLargeTitleHeightOnScrollStyle,
            ]}>
            {children}
          </Animated.View>
        </Animated.View>
      </>
    );
  }
  return (
    <Animated.View>
      <Text>I am here</Text>
      {children}
    </Animated.View>
  );
};

export default Header;
