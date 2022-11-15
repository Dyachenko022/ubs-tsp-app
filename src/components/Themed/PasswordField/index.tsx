import React, { useState } from 'react';
import TextField from '../TextField';
import ShowPasswordIcon from '../../../../assets/passwordShow.svg';
import HidePasswordIcon from '../../../../assets/passwordHide.svg';
import BankTheme from '../../../bankTheme';
import { StyleProp, ViewStyle } from 'react-native';

interface IPasswordField {
  value: string,
  onChangeText: (text: string) => void,
  onSubmit?: () =>  void,
  containerStyle?: StyleProp<ViewStyle>,
  title?: string,
  placeholder?: string,
}

export default function PasswordField(props: IPasswordField) {

  const [hidePassword, setHidePassword] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);
  const togglePassword = () => {
    if (hidePassword) {
      setHidePassword(false);
      const id = setTimeout(() => setHidePassword(true), 2000);
      setTimeoutId(id);
    } else {
      setHidePassword(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(undefined);
      }
    }
  };

  return (
    <TextField
      containerStyle={props.containerStyle}
      useTopErrors
      title={props.title || 'Пароль'}
      placeholder={props.placeholder || 'Введите пароль'}
      secureTextEntry={hidePassword}
      onChangeText={props.onChangeText}
      value={props.value}
      onSubmitEditing={props.onSubmit}
      rightButtonProps={{
        iconSource: () => hidePassword ? <ShowPasswordIcon width={20} height={20} fill={BankTheme.colors.link} /> : <HidePasswordIcon width={20} height={20} fill={BankTheme.colors.link} />,
        onPress: togglePassword,
      }}
    />
  );
}
