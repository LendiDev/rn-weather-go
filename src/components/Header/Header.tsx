import {StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PADDING_HORIZONTAL, PADDING_VERTICAL} from '../../shared/constants';
import {useTypedSelector} from '../../hooks/useTypedSelector';

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
  scrollY?: SharedValue<number>;
  leftActionComponent?: React.ReactNode;
  rightActionComponent?: React.ReactNode;
};

export const TITLE_ROW_HEIGHT = 46;
export const LARGE_TITLE_ROW_HEIGHT = 46;
export const TOTAL_HEADER_HEIGHT =
  LARGE_TITLE_ROW_HEIGHT * 2 + TITLE_ROW_HEIGHT;

const Header: React.FC<HeaderProps> = ({
  title,
  children,
  scrollY,
  leftActionComponent,
  rightActionComponent,
}) => {
  const insets = useSafeAreaInsets();
  const {isSearching, isSearchingFromHome} = useTypedSelector(
    state => state.screens.locationsScreen,
  );
  const storedLargeTitleY = useSharedValue(0);
  const childY = useSharedValue(0);
  const largeTitleContainerOpacity = useSharedValue(1);

  const ANIMATION_DURATION_MS = isSearchingFromHome ? 0 : 250;

  useAnimatedReaction(
    () => isSearching,
    newIsSearching => {
      if (newIsSearching) {
        childY.value =
          storedLargeTitleY.value < -TITLE_ROW_HEIGHT / 2
            ? -TITLE_ROW_HEIGHT - (TITLE_ROW_HEIGHT + storedLargeTitleY.value)
            : -TITLE_ROW_HEIGHT * 2;
        console.log(childY.value, storedLargeTitleY.value, -TITLE_ROW_HEIGHT);
        largeTitleContainerOpacity.value = withTiming(0, {
          duration: ANIMATION_DURATION_MS / 2,
        });
      } else {
        childY.value = 0;
        largeTitleContainerOpacity.value = withTiming(1, {
          duration: ANIMATION_DURATION_MS / 2,
        });
      }
    },
  );

  const animatedSearchBarContainerYStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(childY.value, {
            duration: ANIMATION_DURATION_MS,
          }),
        },
      ],
      paddingTop: PADDING_VERTICAL,
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

  const animatedLargeTitleContainerOpacityStyle = useAnimatedStyle(() => {
    return {opacity: largeTitleContainerOpacity.value};
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
      zIndex: 10,
      backgroundColor: 'red',
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

  return (
    <>
      <View style={styles.statusBar} />
      <Animated.View
        style={[styles.mainContainer, animatedSearchBarContainerYStyle]}>
        <Animated.View style={[styles.titleContainer]}>
          <View style={styles.actionButtonLeft}>{leftActionComponent}</View>
          <Animated.Text style={[styles.titleText, animatedTitleOpacityStyle]}>
            {title}
          </Animated.Text>
          <View style={styles.actionButtonRight}>{rightActionComponent}</View>
        </Animated.View>
        <Animated.View
          style={[
            styles.largeTitleContainer,
            animatedLargeTitleHeightOnScrollStyle,
            animatedLargeTitleContainerOpacityStyle,
          ]}>
          <Animated.Text
            style={[styles.largeTitleText, animatedLargeTitleOpacityStyle]}>
            {title}
          </Animated.Text>
        </Animated.View>
        {children && (
          <Animated.View
            style={[
              styles.largeTitleContainer,
              animatedLargeTitleHeightOnScrollStyle,
            ]}>
            {children}
          </Animated.View>
        )}
      </Animated.View>
    </>
  );
};

export default Header;
