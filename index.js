/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {LogBox} from 'react-native';

// ignores warning that occurs on nested flat lists in Locations Screen
LogBox.ignoreLogs(["TypeError: Cannot read property '_nativeTag' of null"]);

AppRegistry.registerComponent(appName, () => App);
