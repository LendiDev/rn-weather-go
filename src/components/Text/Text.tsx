import {
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import {MyThemeColorsKeys} from '../../types';
import {useTypedTheme} from '../../hooks/useTypedTheme';

interface TextProps extends RNTextProps {
  p?: boolean;
  h1?: boolean;
  h2?: boolean;
  bold?: boolean;
  italic?: boolean;
  color?: MyThemeColorsKeys;
  fontSize?: TextStyle['fontSize'];
  style?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
  children?: React.ReactNode;
  value?: string;
}

const Text: React.FC<TextProps> = ({
  p,
  h1,
  h2,
  bold,
  italic,
  style,
  color,
  fontSize,
  children,
  value,
}) => {
  const {colors} = useTypedTheme();

  const styles = {
    default: StyleSheet.flatten<TextStyle>({
      fontSize: 14,
      fontWeight: 'normal',
      color: colors.text,
    }),
    override: StyleSheet.flatten<TextStyle>([
      h1 && {fontSize: 24},
      h2 && {fontSize: 18},
      p && {fontSize: 14},
      fontSize !== undefined && {fontSize},
      bold && {fontWeight: 'bold'},
      italic && {fontStyle: 'italic'},
      color && {color: colors[color]},
    ]),
  };

  return (
    <RNText style={[styles.default, styles.override, style]}>
      {children || value}
    </RNText>
  );
};

export default Text;
