import {StyleSheet} from 'react-native';
import {LARGE_TITLE_ROW_HEIGHT} from '../../../../components/Header/Header';

export const createStyles = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    listContainer: {
      marginTop: -LARGE_TITLE_ROW_HEIGHT * 2,
    },
    listContentContainer: {paddingTop: LARGE_TITLE_ROW_HEIGHT * 2},
  });
};
