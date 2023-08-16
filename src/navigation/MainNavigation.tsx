import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, SettingsScreen} from '../screens';
import {LocationsScreen} from '../screens/locations';
import SearchLocationsScreen from '../screens/location-search/LocationSearchScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PADDING_HORIZONTAL} from '../shared/constants';
import {useActions} from '../hooks/useActions';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {SCREENS} from '../shared/screens';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const BottomTabStack = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const MainNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomNavigation">
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen
        options={{
          animation: 'fade_from_bottom',
        }}
        name={SCREENS.LOCATION_SEARCH}
        component={SearchLocationsScreen}
      />
    </Stack.Navigator>
  );
};

const BottomNavigation = () => {
  const isEditing = useTypedSelector(
    state => state.screens.locationsScreen.isEditing,
  );
  const {setIsEditing} = useActions();
  const editButtonText = isEditing ? 'Done' : 'Edit';

  return (
    <BottomTabStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName={SCREENS.HOME}>
      <BottomTabStack.Screen
        options={{
          headerShown: false,
          tabBarLabelStyle: {marginBottom: 5},
          tabBarIcon: ({color}) => (
            <Ionicons name="cloudy-outline" size={30} color={color} />
          ),
        }}
        name={SCREENS.HOME}
        component={HomeScreen}
      />
      <BottomTabStack.Screen
        name={SCREENS.LOCATIONS}
        component={LocationsScreen}
        options={{
          lazy: false,
          headerRight: () => (
            <TouchableOpacity
              hitSlop={10}
              style={{paddingRight: PADDING_HORIZONTAL}}
              onPress={() => {
                requestAnimationFrame(() => {
                  setIsEditing(!isEditing);
                });
              }}>
              <Text color={'primary'}>{editButtonText}</Text>
            </TouchableOpacity>
          ),
          tabBarLabelStyle: {marginBottom: 5},
          tabBarIcon: ({color}) => (
            <SimpleLineIcons name="globe" size={22.5} color={color} />
          ),
        }}
      />

      <BottomTabStack.Screen
        name={SCREENS.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarLabelStyle: {marginBottom: 5},
          tabBarIcon: ({color}) => (
            <SimpleLineIcons name="settings" size={22.5} color={color} />
          ),
        }}
      />
    </BottomTabStack.Navigator>
  );
};
