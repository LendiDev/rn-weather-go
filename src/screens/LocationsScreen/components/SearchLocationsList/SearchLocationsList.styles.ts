import {StyleSheet} from 'react-native';
import {BORDER_RADIUS, PADDING_HORIZONTAL} from '../../../../constants';

export const useStyles = () => {
  return StyleSheet.create({
    contentContainer: {
      marginTop: PADDING_HORIZONTAL,
      backgroundColor: 'white',
      borderRadius: BORDER_RADIUS,
    },
  });
};
