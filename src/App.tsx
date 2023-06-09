/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';
import {StatusBar, StatusBarStyle, useColorScheme} from 'react-native';
import {MainTheme, MainThemeDark} from './themes/MainTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

function App(): JSX.Element {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? MainThemeDark : MainTheme;
  const statusBarStyle: StatusBarStyle =
    scheme === 'dark' ? 'light-content' : 'dark-content';

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer theme={theme}>
            <StatusBar
              backgroundColor={theme.colors.background}
              barStyle={statusBarStyle}
            />
            <MainNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
