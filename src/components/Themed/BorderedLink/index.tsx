import React from 'react';
import BankTheme from '../../../bankTheme';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ThemedText from '../Text';
import ArrowRightIcon from '../../../../assets/arrowRight.svg';

interface IBorderedLinkProps {
  label: string,
  onPress: () => void,
  containerStyle?: StyleProp<ViewStyle>,
  textStyle?: TextStyle,
}

export default function BorderedLink(props: IBorderedLinkProps) {
  const isDark = useTheme().dark;
  const borderColor = isDark ? 'white' : '#D7E0EE';
  const backgroundColor = isDark ? 'transparent' : 'white';

  return (
    <TouchableOpacity onPress={props.onPress} style={[{...styles.container, borderColor, backgroundColor}, props.containerStyle]}>
      <ThemedText body style={props.textStyle}>
        {props.label}
      </ThemedText>

      <ArrowRightIcon stroke={BankTheme.colors.link} strokeWidth={2.5} height={24} width={10} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: 'lightgray',
    shadowRadius: 16,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 6,
      height: 6,
    }
  }
});

