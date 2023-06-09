import {HomeScreenProps} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HomeHeader} from './components';
import {Text} from '../../components';
import {useTypedTheme} from '../../hooks/useTypedTheme';
import {View} from 'react-native';
import {useTypedSelector} from '../../hooks/useTypedSelector';

export const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  const {colors} = useTypedTheme();
  const {selectedLocation} = useTypedSelector(state => state.locations);

  return (
    <SafeAreaView style={{backgroundColor: colors.background}}>
      <View
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{`Selected location: ${selectedLocation.id}, ${selectedLocation.name}`}</Text>
      </View>
      <HomeHeader />
    </SafeAreaView>
  );
};
