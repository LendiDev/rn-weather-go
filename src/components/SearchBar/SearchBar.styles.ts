import {Dimensions, Platform, StyleSheet} from 'react-native';
import {MARGIN_HORIZONTAL, PADDING_HORIZONTAL} from '../../shared/constants';
import {useTheme} from '@react-navigation/native';

const SEARCH_BAR_HEIGHT = 40;

export const useStyles = () => {
  const {colors} = useTheme();
  const {width} = Dimensions.get('window');

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      fontSize: 16,
      justifyContent: 'center',
      backgroundColor: colors.input,
      paddingLeft: PADDING_HORIZONTAL,
      paddingRight: PADDING_HORIZONTAL * 2,
      paddingVertical: 0,
      borderRadius: 12,
      maxHeight: SEARCH_BAR_HEIGHT,
      minHeight: SEARCH_BAR_HEIGHT,
    },
    loadingIndicator: {
      position: 'absolute',
      maxHeight: SEARCH_BAR_HEIGHT,
      minHeight: SEARCH_BAR_HEIGHT,
      justifyContent: 'center',
      right: PADDING_HORIZONTAL / 2,
    },
    cancelButton: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: PADDING_HORIZONTAL,
    },
  });

  return styles;
};
