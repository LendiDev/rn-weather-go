import {StyleSheet} from 'react-native';
import {PADDING_HORIZONTAL} from '../../constants';
import {useTheme} from '@react-navigation/native';

const SEARCH_BAR_HEIGHT = 40;

export const useStyles = () => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      fontSize: 16,
      justifyContent: 'center',
      backgroundColor: colors.input,
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
