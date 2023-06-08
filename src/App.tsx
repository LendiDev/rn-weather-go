import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}

export default App;
