import {StyleSheet} from 'react-native';
import {
  PADDING_HORIZONTAL,
  PADDING_VERTICAL,
} from '../../../../../shared/constants';

export const useStyles = () => {
  //const {colors} = useTypedTheme();

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    labelText: {
      paddingVertical: PADDING_VERTICAL * 3,
      paddingHorizontal: PADDING_HORIZONTAL,
    },
    separatorLine: {
      marginLeft: PADDING_HORIZONTAL,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
  });
};
