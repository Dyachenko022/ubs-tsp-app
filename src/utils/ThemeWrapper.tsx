import React from 'react';
import { useTheme } from '@react-navigation/native';

export default function ThemeWrapper<T>(Component: React.ComponentType<T>) {
  const isDark = useTheme().dark;
  return (props: T) => <Component {...props} isDark={isDark} />;
}
