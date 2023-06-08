import {HomeScreen, SettingsScreen} from '../screens';
import {MainStackParamList} from '../types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTabStack = createBottomTabNavigator<MainStackParamList>();

export const MainNavigation = (): JSX.Element => {
  return (
    <BottomTabStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <BottomTabStack.Screen name="Home" component={HomeScreen} />
      <BottomTabStack.Screen name="Settings" component={SettingsScreen} />
    </BottomTabStack.Navigator>
  );
};
