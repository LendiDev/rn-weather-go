import {StyleSheet} from 'react-native';
import {MARGIN_VERTICAL, PADDING_HORIZONTAL} from '../../../../../../constants';
import {useTypedTheme} from '../../../../../../hooks/useTypedTheme';

export const useStyles = () => {
  const {colors} = useTypedTheme();

  const styles = StyleSheet.create({
    root: {
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

  return styles;
};
