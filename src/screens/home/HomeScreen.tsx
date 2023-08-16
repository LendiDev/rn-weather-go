import {HomeHeader} from './components';
import {Text} from '../../components';
import {View} from 'react-native';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useStyles} from './HomeScreen.styles';

export const HomeScreen = () => {
  const styles = useStyles();
  const {selectedLocation} = useTypedSelector(state => state.locations);

  return (
    <>
      <View style={styles.root}>
        {selectedLocation ? (
          <Text>
            Selected location: {JSON.stringify(selectedLocation, null, 4)}
          </Text>
        ) : (
          <Text>No location selected</Text>
        )}
      </View>
      <HomeHeader />
    </>
  );
};
