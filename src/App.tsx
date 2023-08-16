/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';
import {StatusBar, StatusBarStyle, useColorScheme} from 'react-native';
import {MainThemeDark} from './themes/MainTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {isReadyRef, navigationRef} from 'react-navigation-helpers';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {customTheme} from './themes/customTheme';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

enableScreens();

function App(): JSX.Element {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? MainThemeDark : customTheme;
  const statusBarStyle: StatusBarStyle =
    scheme === 'dark' ? 'light-content' : 'dark-content';

  const persistor = persistStore(store);

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={statusBarStyle}
        animated={true}
      />
      <ActionSheetProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <NavigationContainer
                  ref={navigationRef}
                  onReady={() => {
                    isReadyRef.current = true;
                  }}
                  theme={theme}>
                  <MainNavigation />
                </NavigationContainer>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </ActionSheetProvider>
    </>
  );
}

export default App;
