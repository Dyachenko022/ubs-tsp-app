import React from 'react';
import BankTheme from '../../../bankTheme';
import { Colors, TextField as RNUITextField } from 'react-native-ui-lib';
import { TextFieldProps } from 'react-native-ui-lib/typings';
import { useTheme } from '@react-navigation/native';

interface IThemedTextField extends TextFieldProps {
  alwaysRefreshValue?: boolean,
}

export default function ThemedTextField(props: IThemedTextField) {
  const isDark = useTheme().dark;
  const TextField: typeof RNUITextField = props.alwaysRefreshValue ? AlwaysRefreshableTextInput as typeof RNUITextField : RNUITextField;
  return (
    <TextField
      {...props}
      underlineColor={{
        default: Colors.grey50,
        focus: BankTheme.colors.buttonFilled,
        error: Colors.red30
      }}
      titleColor={BankTheme.colors.link}
      color={isDark ? BankTheme.colors.textDark : BankTheme.colors.textLight}
    />
  );
}

// TextField из react-native-ui-lib проверяет, не изменилось ли value.
// Из-за этого маскирование текста не будет работать
// Класс ниже - убирает проверку изменения value из TextField-а
class AlwaysRefreshableTextInput extends RNUITextField {
  UNSAFE_componentWillReceiveProps(nextProps: TextFieldProps) {
    this.setState({value: nextProps.value}, () => {
      this.updateFloatingPlaceholderState();
      if (nextProps.validateOnChange) {
        this.validate();
      }
    });
  }
}
