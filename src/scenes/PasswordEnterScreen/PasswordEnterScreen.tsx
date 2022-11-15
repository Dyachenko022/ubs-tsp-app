import React, { useCallback, useState } from 'react';
import { SafeAreaView , View, Keyboard } from 'react-native';
import Button from '../../components/Button';
import Link from '../../components/Link';
import PasswordField from '../../components/Themed/PasswordField';

export default function PasswordEnterScreen(props: IPasswordEnterScreen) {
  const [password, setPassword] = useState('');

  const onPressAuth = useCallback(() => {
    Keyboard.dismiss();
    props.onPressAuth(password);
  },  [password]);

  return (
    <SafeAreaView style={{flex: 1, margin: 15}}>

      <PasswordField
        value={password}
        onChangeText={setPassword}
        onSubmit={onPressAuth}
      />

      <View style={{alignSelf: 'center'}}>
        <Link label="Забыли пароль" onPress={props.onPressForgot} />
      </View>

      {password.length > 0  && (
        <Button label="Войти" borderRadius={10} filled marginT-20 onPress={onPressAuth} />
      )}
    </SafeAreaView>
  );
}
