import React, { useLayoutEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, View } from 'react-native';
import ThemedText from '../../components/Themed/Text';
import { Text } from 'react-native-ui-lib';
import PasswordField from '../../components/Themed/PasswordField';
import KeyboardClosingView from '../../components/KeyboardClosingView';
import Button from '../../components/Button';
import { checkPassword } from './checkPasswordStrength';
import LockIcon from '../../../assets/lock.png';
import { changePassword } from '../../redux/user/api';
import { showErrorPopup } from '../../redux/globalPopup/actions';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import BankTheme from '../../bankTheme';

type OwnProps = NativeStackScreenProps<RootStackParamList, 'ChangePasswordScreen'>;


export default function ChangePasswordScreen(props: OwnProps) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    if (props.route.params.fromLoginSaga) {
      props.navigation.setOptions({
        headerLeft: () =>  <HeaderBackButton onPress={props.navigation.popToTop} tintColor={BankTheme.colors.link} />,
      });
    }
  }, []);

  const [passwordRepeat, setPasswordRepeat] = useState('');
  const passwordStrength = checkPassword(password);
  let colorOfPasswordStrength = 'red';
  if (passwordStrength === 'Средний') {
    colorOfPasswordStrength = 'orange';
  } else if (passwordStrength === 'Надежный') {
    colorOfPasswordStrength = 'green';
  }
  const onChangePassword = async () => {
    try {
      await changePassword(password);
      Alert.alert('Постоянный пароль успешно установлен',
        'Используйте его для входа в приложении', [{
          text: 'Закрыть',
          onPress: () => {
            if (props.route.params?.successCallback) {
              props.route.params?.successCallback();
            } else {
              props.navigation.pop();
            }
          },
        }]);
    } catch (e) {
      dispatch(showErrorPopup(e));
    }
  };

  return (
    <KeyboardClosingView style={{paddingHorizontal: 16, flex: 1, justifyContent: 'space-between',}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Image source={LockIcon} style={{width: 30, height: 40}} />

          <ThemedText heading marginV-16>
            Установка нового пароля
          </ThemedText>

          <ThemedText marginB-8>
            Задайте постоянный пароль пользователя, который будет использоваться для входа.
          </ThemedText>
          <ThemedText marginB-32>
            Используйте знаки верхнего и нижнего регистра (A-z), цифры (0-9) и специальный символы (! @ * ^ %).
          </ThemedText>

          <PasswordField
            value={password}
            onChangeText={setPassword}
          />

          <View style={{height: 30, alignSelf: 'flex-end'}}>
            {password.length > 3 && (
              <Text color={colorOfPasswordStrength}>
                {passwordStrength}
              </Text>
            )}
          </View>

          <PasswordField
            title="Повторите пароль"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
          />

          <View style={{height: 30, alignSelf: 'flex-end'}}>
            {password !== passwordRepeat && passwordRepeat !== '' && (
              <Text color="red">
              Пароли не совпадают
              </Text>
            )}
          </View>
        </View>

        <Button
          marginB-8
          filled
          disabled={!(password.length > 3 && password === passwordRepeat)}
          label="Сменить пароль"
          onPress={onChangePassword}
        />
      </SafeAreaView>
    </KeyboardClosingView>
  );
}


