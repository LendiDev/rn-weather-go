import {DefaultTheme} from '@react-navigation/native';

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF9800',
    background: 'white',
    card: 'white',
    input: '#FFF3E0',
    destructive: '#FF453A',
    inactive: '#8E8E8F',
    border: '#eee',
  },
};
