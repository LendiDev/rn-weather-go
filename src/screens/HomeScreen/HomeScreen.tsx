import {HomeScreenProps} from '../../types';
import {HomeHeader} from './components';
import {Text} from '../../components';
import {View} from 'react-native';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useStyles} from './HomeScreen.styles';

export const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  const styles = useStyles();
  const {selectedLocation} = useTypedSelector(state => state.locations);

  return (
    <>
      <View style={styles.root}>
        <Text>{`Selected location: ${selectedLocation.id}, ${selectedLocation.name}`}</Text>
      </View>
      <HomeHeader />
    </>
  );
};
