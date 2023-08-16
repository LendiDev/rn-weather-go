import {ExtendedTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

export const createStyles = (theme: ExtendedTheme) => {
  const {colors} = theme;

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    fab: {
      position: 'absolute',
      flex: 1,
      bottom: 20,
      right: 20,
      zIndex: 200,
      height: 55,
      width: 55,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3.5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.62,
      elevation: 4,
    },
  });
};
