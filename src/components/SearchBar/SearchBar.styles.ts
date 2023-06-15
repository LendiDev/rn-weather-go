import {StyleSheet} from 'react-native';
import {useTypedTheme} from '../../hooks/useTypedTheme';
import {PADDING_HORIZONTAL} from '../../constants';

const SEARCH_BAR_HEIGHT = 45;

export const useStyles = () => {
  const {colors} = useTypedTheme();

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.card,
      paddingVertical: 0,
      paddingHorizontal: PADDING_HORIZONTAL,
      borderRadius: 12,
      maxHeight: SEARCH_BAR_HEIGHT,
      minHeight: SEARCH_BAR_HEIGHT,
    },
    cancelButton: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: PADDING_HORIZONTAL,
    },
  });

  return styles;
};
