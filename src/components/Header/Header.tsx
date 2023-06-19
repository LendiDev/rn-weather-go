import {StyleSheet, View} from 'react-native';
import {Text} from '..';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PADDING_HORIZONTAL} from '../../constants';

type HeaderProps = {
  title: string;
  children?: React.ReactNode[] | React.ReactNode;
  scrollY?: SharedValue<number>;
  animatedTransformY?: SharedValue<number>;
};

export const TITLE_ROW_HEIGHT = 40;
export const LARGE_TITLE_ROW_HEIGHT = 45;
export const TOTAL_HEADER_HEIGHT =
  LARGE_TITLE_ROW_HEIGHT * 2 + TITLE_ROW_HEIGHT;

const Header: React.FC<HeaderProps> = ({
  title,
  children,
  scrollY,
  animatedTransformY,
}) => {
  const insets = useSafeAreaInsets();

  const animatedTransformYStyle = useAnimatedStyle(() => {
    const translateY = animatedTransformY?.value || 0;
    return {
      transform: [{translateY}],
    };
  });

  const animatedLargeTitleHeightStyle = useAnimatedStyle(() => {
    const scrollYValue = scrollY?.value || 0;
    const translateY = interpolate(
      scrollYValue,
      [0, LARGE_TITLE_ROW_HEIGHT],
      [0, -LARGE_TITLE_ROW_HEIGHT],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY}],
    };
  });

  /*
  Interpolation with CLAMP

  Input:  [from, to]
  Output: [from, to]

  Example:
  [0, 100] - assume x is 50
  [0, 50]
  then output value will be: 25.

  or

  Input:  [minStart, maxStop]
  Output: [minStart, maxStop]
  */
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
    const animatedTransformYValue = animatedTransformY?.value || 0;
    if (scrollY && animatedTransformYValue === 0) {
      const scrollYValue = scrollY?.value || 0;
      const opacity = interpolate(
        scrollYValue,
        [LARGE_TITLE_ROW_HEIGHT / 2, LARGE_TITLE_ROW_HEIGHT / 1.5],
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
  });

  const styles = StyleSheet.create({
    mainContainer: {
      zIndex: 4,
    },
    statusBar: {
      zIndex: 3,
      height: insets.top,
      backgroundColor: 'white',
    },
    titleText: {fontSize: 16, fontWeight: '600'},
    titleContainer: {
      zIndex: 2,
      height: TITLE_ROW_HEIGHT,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    largeTitleContainer: {
      zIndex: 1,
      height: LARGE_TITLE_ROW_HEIGHT,
      backgroundColor: 'white',
      justifyContent: 'center',
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    bottomContainer: {
      // paddingBottom: 5,
    },
    largeTitleText: {fontSize: 28, fontWeight: '700'},
  });

  if (!Array.isArray(children)) {
    return (
      <Animated.View style={[styles.mainContainer, animatedTransformYStyle]}>
        <View style={styles.statusBar} />
        <Animated.View style={[styles.titleContainer]}>
          <Animated.Text style={[styles.titleText, animatedTitleOpacityStyle]}>
            {title}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[styles.largeTitleContainer, animatedLargeTitleHeightStyle]}>
          <Animated.Text
            style={[styles.largeTitleText, animatedLargeTitleOpacityStyle]}>
            {title}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.largeTitleContainer,
            styles.bottomContainer,
            animatedLargeTitleHeightStyle,
          ]}>
          {children}
        </Animated.View>
      </Animated.View>
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
