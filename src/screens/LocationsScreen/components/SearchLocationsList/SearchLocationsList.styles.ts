import {StyleSheet} from 'react-native';
import {BORDER_RADIUS, PADDING_HORIZONTAL} from '../../../../constants';
import {useTypedTheme} from '../../../../hooks/useTypedTheme';

export const useStyles = () => {
  const {colors} = useTypedTheme();

  return StyleSheet.create({
    contentContainer: {
      marginTop: PADDING_HORIZONTAL,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS,
    },
  });
};
