import {StyleSheet} from 'react-native';
import {TOTAL_HEADER_HEIGHT} from '../../components/Header/Header';

export const useStyles = () => {
  return StyleSheet.create({
    root: {
      display: 'flex',
      top: TOTAL_HEADER_HEIGHT,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
