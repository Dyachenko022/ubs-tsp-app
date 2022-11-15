import React from 'react';
import { Button as UIButton } from 'react-native-ui-lib';
import { ButtonProps } from 'react-native-ui-lib/generatedTypes/components/button/ButtonTypes';
import { StyleSheet } from 'react-native';
import BankTheme from '../../bankTheme';

interface IButtonProps {
  filled?: boolean,
}

export default function Button(props: IButtonProps & ButtonProps) {

  const color = props.filled ? 'white' : BankTheme.colors.buttonFilled;
  const style = props.filled ? styles.filled: styles.notFilled;

  const modifiedStyle = { ...style};
  if (props.disabled) {
    modifiedStyle.backgroundColor = '#BFC0DC';
    modifiedStyle.borderColor = '#BFC0DC';
  }

  return (
    <UIButton style={modifiedStyle} color={color} {...props} />
  );
}

const styles = StyleSheet.create({
  notFilled: {
    borderRadius: 8,
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'transparent',
    borderColor: BankTheme.colors.buttonFilled,
    borderWidth: 1,
    marginVertical: 2,
  },
  filled: {
    borderRadius: 8,
    alignItems: 'center',
    padding: 5,
    backgroundColor: BankTheme.colors.buttonFilled,
    borderColor: BankTheme.colors.buttonFilled,
    borderWidth: 1,
    marginVertical: 2,
  }
});
