import React from 'react';
import BankTheme from '../../bankTheme';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-ui-lib';

interface ILinkProps {
  label: string,
  onPress: () => void,
  containerStyle?: StyleProp<ViewStyle>,
  textStyle?: TextStyle,
  icon?: () => JSX.Element,
}

export default function Link(props: ILinkProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.containerStyle]}>
      {props.icon && (
        <View style={styles.iconContainer}>
          {props.icon()}
        </View>
      )}
      <Text color={BankTheme.colors.link} style={props.textStyle}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 5,
  }
});
