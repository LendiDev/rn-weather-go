import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {LARGE_TITLE_ROW_HEIGHT} from '../../../components/Header/Header';
import {ExtendedTheme} from '@react-navigation/native';

export const createStyles = (_theme: ExtendedTheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
  });
};
