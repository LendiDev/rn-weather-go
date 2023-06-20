import {DefaultTheme} from '@react-navigation/native';

export const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    background: 'white',
    card: 'white',
    input: '#eee',
  },
};
