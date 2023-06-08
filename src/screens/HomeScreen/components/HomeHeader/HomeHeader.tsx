import {Text, View} from 'react-native';
import {useStyles} from './HomeHeader.styles';

export const HomeHeader = () => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <Text>I am header</Text>
    </View>
  );
};
