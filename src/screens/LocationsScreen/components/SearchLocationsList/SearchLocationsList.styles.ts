import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {LARGE_TITLE_ROW_HEIGHT} from '../../../../components/Header/Header';
import {ExtendedTheme} from '@react-navigation/native';

export const createStyles = (_theme: ExtendedTheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    contentContainer: {
      zIndex: 20,
      marginTop: insets.top + LARGE_TITLE_ROW_HEIGHT,
      position: 'absolute',
      width: '100%',
      top: 0,
      bottom: 0,
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
    backdropSearching: {
      zIndex: 1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255,255,255, 1)',
    },
    listContainer: {
      zIndex: 3,
    },
  });
};
