import {DefaultTheme} from '@react-navigation/native';
import {MyTheme} from '../types';

export const MainTheme: MyTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    text: '#000',
  },
};

export const MainThemeDark: MyTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    background: '#121212',
    text: '#fff',
  },
};
