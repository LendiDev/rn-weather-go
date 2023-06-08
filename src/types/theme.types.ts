import {Theme} from '@react-navigation/native';

export interface MyTheme extends Theme {
  dark: boolean;
  colors: MyThemeColors;
}

export interface MyThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
}

export type MyThemeColorsKeys = keyof MyThemeColors;
