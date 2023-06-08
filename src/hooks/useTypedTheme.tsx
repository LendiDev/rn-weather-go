import {useTheme} from '@react-navigation/native';
import {MyTheme} from '../themes/MainTheme';

export const useTypedTheme = (): MyTheme => {
  return useTheme() as MyTheme;
};
