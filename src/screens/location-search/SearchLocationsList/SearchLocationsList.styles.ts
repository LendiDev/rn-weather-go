import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {LARGE_TITLE_ROW_HEIGHT} from '../../../components/Header/Header';
import {ExtendedTheme} from '@react-navigation/native';

export const createStyles = (_theme: ExtendedTheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    contentContainer: {
      zIndex: 2,
    },
    backdrop: {
      zIndex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(255,255,255, 1)',
    },
    listContainer: {
      zIndex: 3,
    },
  });
};
