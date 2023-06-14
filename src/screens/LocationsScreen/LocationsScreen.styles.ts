import {StyleSheet} from 'react-native';
import {PADDING_HORIZONTAL} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    root: {
      flex: 1,
      marginTop: insets.top,
      paddingTop: 7.5,
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    searchContainer: {flexDirection: 'row', alignItems: 'center'},
  });
};
