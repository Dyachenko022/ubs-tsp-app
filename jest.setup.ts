import {NativeModules, AccessibilityInfo} from 'react-native';

NativeModules.StatusBarManager = {getHeight: jest.fn()};
jest.spyOn(AccessibilityInfo, 'isScreenReaderEnabled').mockImplementation(() => new Promise.resolve(false));

// mock native modules
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
global.__reanimatedWorkletInit = jest.fn();
jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  reactNative.NativeModules.KeyboardTrackingViewTempManager = {};
  return reactNative;
});

NativeModules.BankTheme = {
  colors: {
    textDark: 'white',
    textLight: 'black',
    link: 'blue',
  }
};
