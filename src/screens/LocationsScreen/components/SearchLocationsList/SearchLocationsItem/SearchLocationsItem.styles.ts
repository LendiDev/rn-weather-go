import {StyleSheet} from 'react-native';
import {PADDING_HORIZONTAL, PADDING_VERTICAL} from '../../../../../constants';

export const useStyles = () => {
  //const {colors} = useTypedTheme();

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingLeft: PADDING_HORIZONTAL,
    },
    labelText: {
      paddingVertical: PADDING_VERTICAL * 3,
      paddingRight: PADDING_HORIZONTAL,
    },
    separatorLine: {
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
  });
};
