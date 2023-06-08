import {Text} from 'react-native';
import {HomeScreenProps} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HomeHeader} from './components';

export const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  return (
    <SafeAreaView>
      <HomeHeader />
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};
