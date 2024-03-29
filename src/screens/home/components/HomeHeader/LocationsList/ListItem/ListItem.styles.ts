import {StyleSheet} from 'react-native';
import {
  MARGIN_VERTICAL,
  PADDING_HORIZONTAL,
} from '../../../../../../shared/constants';
import {ExtendedTheme} from '@react-navigation/native';

export const createStyles = (theme: ExtendedTheme) => {
  const {colors} = theme;

  return StyleSheet.create({
    root: {
      borderRadius: 10,
      marginVertical: MARGIN_VERTICAL,
      paddingHorizontal: PADDING_HORIZONTAL,
      backgroundColor: colors.background,
      justifyContent: 'center',
      maxWidth: 250,
      height: 35,
    },
    active: {
      backgroundColor: colors.input,
    },
  });
};
