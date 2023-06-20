import {StyleSheet} from 'react-native';
import {MARGIN_HORIZONTAL} from '../../../../../constants';

export const useStyles = () => {
  //const {colors} = useTypedTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    contentContainer: {
      paddingRight: MARGIN_HORIZONTAL,
      paddingLeft: MARGIN_HORIZONTAL,
    },
  });
};
