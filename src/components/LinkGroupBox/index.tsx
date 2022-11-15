import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Link from '../Link';
import BankTheme from '../../bankTheme';

interface ILingGroupBoxItem {
  label: string,
  onPress: () => void,
  icon: JSX.Element,
}

interface ILinkGroupBoxProps {
  items: ILingGroupBoxItem[],
  containerStyle?: ViewStyle,
}

export default function LinkGroupBox(props: ILinkGroupBoxProps) {
  const isDark = useTheme().dark;
  const backgroundColor = isDark ? 'rgba(46,  61, 74, 0.6)' : '#F1F1F1';

  return (
    <View style={{ backgroundColor, ...styles.container, ...props.containerStyle }}>
      {props.items.map((item, index) => (
        <Link
          key={item.label + index.toString()}
          label={item.label}
          onPress={item.onPress}
          icon={() => item.icon}
          textStyle={styles.linkText}
          containerStyle={index < props.items.length -1 ? styles.linkContainer : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 15,
  },
  linkText: {
    fontSize: 21,
    color: BankTheme.colors.link,
  },
  linkContainer: {
    marginBottom: 24,
  },
});
