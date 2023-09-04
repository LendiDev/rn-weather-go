import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {ExtendedTheme} from '@react-navigation/native';

export const createStyles = (_theme: ExtendedTheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
      marginBottom: -insets.bottom,
    },
  });
};
