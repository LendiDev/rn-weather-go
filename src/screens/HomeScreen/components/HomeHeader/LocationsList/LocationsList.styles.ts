import {StyleSheet} from 'react-native';
import {useTypedTheme} from '../../../../../hooks/useTypedTheme';
import {MARGIN_HORIZONTAL} from '../../../../../constants';

export const useStyles = () => {
  const {colors} = useTypedTheme();

  return StyleSheet.create({
    root: {},
    contentContainer: {
      marginLeft: MARGIN_HORIZONTAL / 2,
      paddingRight: MARGIN_HORIZONTAL * 1.5,
    },
  });
};
