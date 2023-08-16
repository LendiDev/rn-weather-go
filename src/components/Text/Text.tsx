import {
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import {ExtendedTheme, useTheme} from '@react-navigation/native';

interface TextProps extends RNTextProps {
  p?: boolean;
  h1?: boolean;
  h2?: boolean;
  bold?: boolean;
  weight?: TextStyle['fontWeight'];
  italic?: boolean;
  color?: keyof ExtendedTheme['colors'];
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
  weight,
  italic,
  style,
  color,
  fontSize,
  children,
  value,
}) => {
  const {colors} = useTheme();

  const styles = {
    default: StyleSheet.flatten<TextStyle>({
      fontSize: 16,
      fontWeight: 'normal',
      color: colors.text,
    }),
    override: StyleSheet.flatten<TextStyle>([
      h1 && {fontSize: 24},
      h2 && {fontSize: 18},
      p && {fontSize: 14},
      fontSize !== undefined && {fontSize},
      bold && {fontWeight: 'bold'},
      weight && {fontWeight: weight},
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
