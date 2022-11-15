import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ThemedText from '../Text';
import { useTheme } from '@react-navigation/native';

interface IButtonsBar {
  buttons: string[],
  selectedIndex: number,
  onChangeSelectedIndex: (index: number) => void,
}

export default function ButtonsBar(props: IButtonsBar) {
  const activeColor = useTheme().dark ? '#636366' : '#FFFFFF';
  return (
    <View style={styles.container}>
      {props.buttons.map((buttonName, index) => (
        <TouchableOpacity key={buttonName}
          disabled={index === props.selectedIndex}
          onPress={() => props.onChangeSelectedIndex(index)}
          style={index === props.selectedIndex ? {...styles.selectedButton, backgroundColor: activeColor} : styles.button}
        >
          <ThemedText>
            {buttonName}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, padding: 3,
    backgroundColor: 'rgba(118, 118, 128, 0.2)',
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    padding: 5,
  },
  selectedButton: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    padding: 5,
  }
});
