import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useTheme } from '@react-navigation/native';
import ThemedText from '../Text';

interface IKeyValuePairText {
  label: string,
  value: string,
  containerStyle?: ViewStyle,
  fontSize?: number,
}

export default function KeyValuePairText(props: IKeyValuePairText) {
  const isDark = useTheme().dark;
  let style = undefined;
  if (props.fontSize) {
    style = {
      fontSize: props.fontSize,
    };
  }

  return (
    <View style={props.containerStyle}>
      <Text small marginB-8 color={isDark ? 'rgba(255,255,255, 0.6)' : 'rgba(46, 61, 73, 0.6)'}>
        {props.label}
      </Text>
      <ThemedText subheading marginB-16 style={style}>
        {props.value}
      </ThemedText>
    </View>
  );
}
