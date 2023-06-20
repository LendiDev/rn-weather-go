import {ExtendedTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';

export const createStyles = (_theme: ExtendedTheme, _insets: EdgeInsets) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    searchContainer: {
      zIndex: 5,
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingBottom: 5,
    },
  });
};
