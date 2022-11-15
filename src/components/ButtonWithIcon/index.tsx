import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

interface IButtonWithIcon {
  label: string,
  icon: IImageUri,
  onPress: () => void,
}

export default function ButtonWithIcon(props: IButtonWithIcon) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image source={props.icon} style={styles.image} />
      <Text linkColor marginT-5>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
  container: {
    alignItems: 'center',
    width: 75,
  }
});
