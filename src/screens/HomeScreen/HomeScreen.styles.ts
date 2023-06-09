import {StyleSheet} from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    root: {
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
