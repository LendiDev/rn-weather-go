import {View} from 'react-native';
import {useStyles} from './HomeHeader.styles';
import {Text} from '../../../../components';

export const HomeHeader = () => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <Text h1>Children text</Text>
    </View>
  );
};
