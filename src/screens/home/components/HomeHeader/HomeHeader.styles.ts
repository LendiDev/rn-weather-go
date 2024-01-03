import {StatusBar, StyleSheet} from 'react-native';
import {
  MAIN_HEADER_HEIGHT,
  MARGIN_HORIZONTAL,
} from '../../../../shared/constants';
import {ExtendedTheme} from '@react-navigation/native';
import {EdgeInsets} from 'react-native-safe-area-context';

export const createStyles = (theme: ExtendedTheme, insets: EdgeInsets) => {
  const {colors} = theme;

  return StyleSheet.create({
    root: {
      position: 'absolute',
      top: insets.top + 2.5,
      left: 0,
      right: 0,
      height: MAIN_HEADER_HEIGHT,
      zIndex: 1,
      paddingTop: 5,
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
};
