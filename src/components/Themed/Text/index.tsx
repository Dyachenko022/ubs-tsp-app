import React from 'react';
import BankTheme from '../../../bankTheme';
import { Text } from 'react-native-ui-lib';
import { TextProps } from 'react-native-ui-lib/generatedTypes';
import { useTheme } from '@react-navigation/native';

interface IChildren {
  children: React.ReactNode;
}

export default function ThemedText(props: TextProps & IChildren) {
  const isDark = useTheme().dark;
  return (
    <Text
      {...props}
      color={isDark ? BankTheme.colors.textDark : BankTheme.colors.textLight}
    />
  );
}
