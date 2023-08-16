import {StyleSheet} from 'react-native';
import {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../../shared/constants';
import {useTheme} from '@react-navigation/native';

export const useStyles = () => {
  const {colors} = useTheme();

  return StyleSheet.create({
    cellContainer: {
      flex: 1,
    },
    contentContainer: {
      flexDirection: 'row',
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    labelText: {
      flex: 1,
      paddingVertical: PADDING_VERTICAL * 3,
    },
    loadingIndicator: {
      width: 20,
      right: 0,
    },
    separatorLine: {
      marginLeft: PADDING_HORIZONTAL,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
  });
};
