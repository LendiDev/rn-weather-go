import {DefaultTheme} from '@react-navigation/native';

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    customColor: '#ccc',
  },
};
