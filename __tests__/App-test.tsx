/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import {Text} from '../src/components';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it.skip('renders correctly', () => {
  renderer.create(<App />);
});

it.skip('Text renders correctly', () => {
  renderer.create(
    <Text h1 h2 p italic>
      Text
    </Text>,
  );
});
