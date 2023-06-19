import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  Settings: undefined;
  Locations: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type SettingsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Settings'
>;

export type LocationsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Locations'
>;
