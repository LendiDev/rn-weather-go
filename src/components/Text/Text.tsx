import {
  Text as GenericText,
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
} from 'react-native';
import {MyThemeColorsKeys} from '../../types';
import {useTypedTheme} from '../../hooks/useTypedTheme';

interface RNTextProps extends TextProps {
  p?: boolean;
  h1?: boolean;
  h2?: boolean;
  bold?: boolean;
  italic?: boolean;
  color?: MyThemeColorsKeys;
  style?: StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;
  children?: React.ReactNode;
  value?: string;
}

const Text: React.FC<RNTextProps> = ({
  p,
  h1,
  h2,
  bold,
  italic,
  style,
  color,
  children,
  value,
}) => {
  const {colors} = useTypedTheme();

  const styles = StyleSheet.flatten<TextStyle>([
    h1 && {fontSize: 32},
    h2 && {fontSize: 28},
    p && {fontSize: 18},
    bold && {fontWeight: 'bold'},
    italic && {fontStyle: 'italic'},
    color && {color: colors[color]},
  ]);

  return (
    <GenericText style={[defaultStyles.default, styles, style]}>
      {children || value}
    </GenericText>
  );
};

const defaultStyles = StyleSheet.create({
  default: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
});

export default Text;
