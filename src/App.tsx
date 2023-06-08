import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';
import {StatusBar, StatusBarStyle, useColorScheme} from 'react-native';
import {MainTheme, MainThemeDark} from './themes/MainTheme';

function App(): JSX.Element {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? MainThemeDark : MainTheme;
  const statusBarStyle: StatusBarStyle =
    scheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <NavigationContainer theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={statusBarStyle}
      />
      <MainNavigation />
    </NavigationContainer>
  );
}

export default App;
