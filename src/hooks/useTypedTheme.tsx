import {useTheme} from '@react-navigation/native';
import {MyTheme} from '../types';

export const useTypedTheme = (): MyTheme => {
  return useTheme() as MyTheme;
};
