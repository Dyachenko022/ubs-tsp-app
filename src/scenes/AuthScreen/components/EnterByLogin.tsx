import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import BankTheme from '../../../bankTheme';
import Button from '../../../components/Button';
import Text from '../../../components/Themed/Text';
import TextField from '../../../components/Themed/TextField';
import UserIcon from '../../../../assets/user.svg';
import Link from '../../../components/Link';
import AutosizeImage from '../../../components/AutosizeImage';

const screenHeight = Dimensions.get('window').height;
const imageHeight = Dimensions.get('window').width / 1.23;
const imageOffset =  440;


interface IEnterByLoginProps {
  onClickAuth: (login: string) => void,
  onOpenAbonentList: () => void,
  onClickForgot: () => void,
  hasListAbonents: boolean,
}

export default function EnterByLogin(props: IEnterByLoginProps) {
  const [login, setLogin] = useState('');
  const onClickAuth = () => {
    props.onClickAuth(login);
    setLogin('');
  };

  return (
    <>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>

        <KeyboardAvoidingView
          behavior="position"
          style={{zIndex: 4, padding: 10}}
        >

          <AutosizeImage maxHeight={60} source={BankTheme.images.loginPageLogo} containerStyle={styles.logo} />

          <Text heading textColor marginB-20>
            Добро пожаловать!
          </Text>

          <Text subheading textColor marginB-30>
            Принимайте платежи по QR-коду без карт и терминалов
          </Text>

          <TextField
            title="Имя пользователя"
            placeholder="Введите ваш логин"
            value={login}
            onChangeText={setLogin}
            onSubmitEditing={onClickAuth}
            autoCapitalize="none"
            rightButtonProps={props.hasListAbonents ? {
              // eslint-disable-next-line react/display-name
              iconSource: () => <UserIcon width={20} height={20} fill={BankTheme.colors.link} />,
              onPress: props.onOpenAbonentList,
            } : undefined}
          />

          <View style={{alignSelf: 'center'}}>
            <Link label={'Забыли имя пользователя?'} onPress={props.onClickForgot} />
          </View>

          {(login.length > 0) ? (
            <Button marginT-20
              borderRadius={10}
              filled
              label="Продолжить"
              onPress={onClickAuth}
            />
          ) : null}

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <Image source={BankTheme.images.loginPageImage}
        style={styles.image} resizeMode="cover"
      />

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height : screenHeight,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: imageHeight,
    top: imageOffset,
    position: 'absolute',
  }
});
