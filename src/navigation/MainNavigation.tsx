import {HomeScreen, SettingsScreen} from '../screens';
import {LocationsScreen} from '../screens/LocationsScreen';
import {MainStackParamList} from '../types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTabStack = createBottomTabNavigator<MainStackParamList>();

export const MainNavigation: React.FC = () => {
  return (
    <BottomTabStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <BottomTabStack.Screen name="Home" component={HomeScreen} />
      <BottomTabStack.Screen
        name="Locations"
        component={LocationsScreen}
        options={{lazy: true}}
      />
      <BottomTabStack.Screen name="Settings" component={SettingsScreen} />
    </BottomTabStack.Navigator>
  );
};
