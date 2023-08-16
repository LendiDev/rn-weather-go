import {ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useSafeAreaStyles = (flex: boolean = false): ViewStyle => {
  const insets = useSafeAreaInsets();

  return {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingLeft: insets.left,
    paddingBottom: insets.bottom,
    flex: flex ? 1 : undefined,
  };
};
