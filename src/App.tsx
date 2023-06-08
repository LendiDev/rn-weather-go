import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';
import {useColorScheme} from 'react-native';
import {MainTheme, MainThemeDark} from './themes/MainTheme';

function App(): JSX.Element {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? MainThemeDark : MainTheme;

  return (
    <NavigationContainer theme={theme}>
      <MainNavigation />
    </NavigationContainer>
  );
}

export default App;
