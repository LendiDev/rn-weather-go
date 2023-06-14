import {StyleSheet} from 'react-native';
import {BORDER_RADIUS, MARGIN_VERTICAL} from '../../../../constants';
import {useTypedTheme} from '../../../../hooks/useTypedTheme';

export const useStyles = () => {
  const {colors} = useTypedTheme();

  return StyleSheet.create({
    contentContainer: {
      marginTop: MARGIN_VERTICAL * 3,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS,
    },
  });
};
