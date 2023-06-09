import {StyleSheet} from 'react-native';
import {MARGIN_HORIZONTAL} from '../../../../../constants';

export const useStyles = () => {
  //const {colors} = useTypedTheme();

  return StyleSheet.create({
    root: {},
    contentContainer: {
      marginLeft: MARGIN_HORIZONTAL,
      paddingRight: MARGIN_HORIZONTAL * 2,
    },
  });
};
