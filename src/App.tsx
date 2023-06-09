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
import {Metrics, SafeAreaProvider} from 'react-native-safe-area-context';

function App(): JSX.Element {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? MainThemeDark : MainTheme;
  const statusBarStyle: StatusBarStyle =
    scheme === 'dark' ? 'light-content' : 'dark-content';

  const persistor = persistStore(store);

  const initialMetrics: Metrics = {
    insets: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    frame: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer theme={theme}>
              <StatusBar
                backgroundColor={theme.colors.background}
                barStyle={statusBarStyle}
              />
              <MainNavigation />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
