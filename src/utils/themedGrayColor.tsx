import {useTheme} from '@react-navigation/native';

export default function themedGrayColor() {
  return useTheme().dark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(46, 61, 73, 0.6)';
}
