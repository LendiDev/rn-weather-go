import {StyleSheet} from 'react-native';
import {useTypedTheme} from '../../../../hooks/useTypedTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MAIN_HEADER_HEIGHT, MARGIN_HORIZONTAL} from '../../../../constants';

export const useStyles = () => {
  const {colors} = useTypedTheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    root: {
      position: 'absolute',
      top: insets.top,
      left: 0,
      right: 0,
      height: MAIN_HEADER_HEIGHT,
      zIndex: 1,
      paddingTop: 7.5,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.background,
    },
    halfContainer: {
      flex: 1,
    },
    searchBarContainer: {
      marginHorizontal: MARGIN_HORIZONTAL,
    },
  });

  return styles;
};
