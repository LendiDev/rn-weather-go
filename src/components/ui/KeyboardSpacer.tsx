import {FC, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  LayoutAnimationConfig,
  Platform,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';

const defaultAnimation: LayoutAnimationConfig = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

export const KeyboardSpacer: FC<ViewProps> = () => {
  const {height: screenHeight} = useWindowDimensions();
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const updateKeyboardSpace = (event: KeyboardEvent) => {
      if (!event.endCoordinates) {
        return;
      }

      let animationConfig = defaultAnimation;
      if (Platform.OS === 'ios') {
        animationConfig = LayoutAnimation.create(
          event.duration,
          LayoutAnimation.Types[event.easing],
          LayoutAnimation.Properties.opacity,
        );
      }
      LayoutAnimation.configureNext(animationConfig);

      const keyboardSpace = screenHeight - event.endCoordinates.screenY;
      setKeyboardSpace(keyboardSpace);
    };

    const resetKeyboardSpace = (event: KeyboardEvent) => {
      let animationConfig = defaultAnimation;
      if (Platform.OS === 'ios') {
        animationConfig = LayoutAnimation.create(
          event.duration,
          LayoutAnimation.Types[event.easing],
          LayoutAnimation.Properties.opacity,
        );
      }
      LayoutAnimation.configureNext(animationConfig);

      setKeyboardSpace(0);
    };

    const updateListener =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  }, [screenHeight]);

  return (
    <View
      style={{
        left: 0,
        right: 0,
        bottom: 0,
        height: keyboardSpace,
      }}
    />
  );
};
