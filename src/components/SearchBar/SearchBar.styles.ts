import {StyleSheet} from 'react-native';
import {useTypedTheme} from '../../hooks/useTypedTheme';
import {
  MARGIN_HORIZONTAL,
  MARGIN_VERTICAL,
  PADDING_HORIZONTAL,
} from '../../constants';

export const useStyles = () => {
  const {colors} = useTypedTheme();

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      marginHorizontal: MARGIN_HORIZONTAL,
      marginVertical: MARGIN_VERTICAL / 2,
      backgroundColor: colors.card,
      paddingVertical: 0,
      paddingHorizontal: PADDING_HORIZONTAL,
      borderRadius: 12,
    },
  });

  return styles;
};
