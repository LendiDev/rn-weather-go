import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  Locations: undefined;
  Settings: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type SettingsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Settings'
>;
