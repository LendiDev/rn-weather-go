import {DefaultTheme} from '@react-navigation/native';

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    background: 'white',
    card: 'white',
    input: '#eee',
    destructive: '#FF453A',
    inactive: '#8E8E8F',
  },
};
