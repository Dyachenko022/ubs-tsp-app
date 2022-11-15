import React from 'react';
import { ImageSourcePropType, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface IActionCard {
  label: string,
  image: ImageSourcePropType,
  onPress: () => void,
}

export default function ActionCard(props: IActionCard) {

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image source={props.image} style={styles.image} />
      <Text style={styles.text}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(33, 32, 125, 0.25)',
    borderRadius: 12,
    width: 107,
    height: 80,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  image: {
    width: 24,
    height: 24,
  },
  text : {
    color: 'white',
    fontSize: 14,
  }
});
