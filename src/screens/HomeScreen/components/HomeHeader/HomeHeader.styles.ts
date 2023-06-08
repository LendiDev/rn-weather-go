import {StyleSheet} from 'react-native';
import {useTypedTheme} from '../../../../hooks/useTypedTheme';

export const useStyles = () => {
  const {colors} = useTypedTheme();

  const styles = StyleSheet.create({
    root: {
      backgroundColor: colors.background,
    },
  });

  return styles;
};
