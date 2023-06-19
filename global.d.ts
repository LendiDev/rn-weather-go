import {customTheme} from './src/themes/customTheme';

declare module '@react-navigation/native' {
  export type ExtendedTheme = typeof customTheme;
  export function useTheme(): ExtendedTheme;
}
