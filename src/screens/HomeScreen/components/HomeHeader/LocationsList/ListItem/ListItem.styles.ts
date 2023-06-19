import {StyleSheet} from 'react-native';
import {MARGIN_VERTICAL, PADDING_HORIZONTAL} from '../../../../../../constants';
import {ExtendedTheme} from '@react-navigation/native';

export const createStyles = (theme: ExtendedTheme) => {
  const {colors} = theme;

  return StyleSheet.create({
    root: {
      flex: 1,
      borderRadius: 10,
      marginVertical: MARGIN_VERTICAL * 1.5,
      paddingHorizontal: PADDING_HORIZONTAL,
      backgroundColor: colors.background,
      justifyContent: 'center',
    },
    active: {
      backgroundColor: colors.card,
    },
  });
};
