import {HomeScreenProps} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HomeHeader} from './components';
import {Text} from '../../components';
import {useTypedTheme} from '../../hooks/useTypedTheme';

export const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  const {colors} = useTypedTheme();

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <Text>Home screen</Text>
      <HomeHeader />
    </SafeAreaView>
  );
};
