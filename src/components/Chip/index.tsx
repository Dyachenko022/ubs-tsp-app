import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-ui-lib';
import BankTheme from '../../bankTheme';

interface IChipProps {
  active: boolean,
  onPress: () => void,
  label: string,
}

export default function Chip(props: IChipProps) {
  const styles = props.active ? chipActiveStyles: chipNotActiveStyles;

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.chip}>
      <Text style={styles.text}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const chipActiveStyles = StyleSheet.create({
  chip: {
    margin: 8,
    padding: 12,
    backgroundColor: BankTheme.colors.link,
    borderRadius: 12,
    minWidth: 73,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  }
});

const chipNotActiveStyles = StyleSheet.create({
  chip: {
    margin: 8,
    padding: 12,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    minWidth: 73,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: BankTheme.colors.link,
  }
});
