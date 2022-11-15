import React, { useState, useEffect } from 'react';
import Text from '../../components/Themed/Text';
import CodeKeyboard from '../../components/Themed/CodeKeyboard';
import { View, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import Link from '../../components/Link';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'CodeEnterScreen'>;
export type NavigationProp  = {
  navigation: OwnNavigationProp
};

export default function CodeEnterScreen(props: ICodeEnterScreenProps & NavigationProp)  {
  const [code, setCode] = useState('');
  const [lastCode, setLastCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.popToTop();
      return true;
    });
    return () => unsubscribe.remove();
  }, []);

  const onBackspacePressed = () => {
    if (code.length > 0) {
      setCode(code.slice(0, code.length - 1));
    }
  };

  const onKeyPressed = (key: string) => {
    const newCode = code + key;
    if (newCode.length > 4) return;
    setCode(newCode);
    setErrorMessage('');
    if (newCode.length === 4) {
      if (!lastCode) {
        setLastCode(newCode);
        setCode('');
        return;
      }
      if (lastCode !== newCode) {
        setErrorMessage('Коды не совпадают');
        setLastCode('');
        setCode('');
        return;
      }
      props.onCodeEnter(newCode);
    }
  };

  const renderBubbles = () => {
    const bubbles = [];
    for (let i=0; i<4; i++ ) {
      const backgroundColor = i < code.length ? 'green' : '#C4C4C4';

      bubbles.push(
        <View key={i} style={{width: 12, height: 12, margin: 5, backgroundColor, borderRadius: 8}} />
      );
    }
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center',  width: '100%', paddingTop: 10 ,}}>
        {bubbles}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center'}}>
      <Text heading paddingT-15 marginL-15>
        Регистрация приложения
      </Text>

      <Text subheading margin-16 style={{height: 50}}>
        { lastCode.length === 0 ? 'Укажите короткий код доступа для входа' : 'Повторно введите код'}
      </Text>

      {renderBubbles()}

      <Text style={styles.errorMsg}>
        {errorMessage}
      </Text>

      <View style={{alignSelf: 'center', marginBottom: 16}}>
        <CodeKeyboard
          onBackspacePressed={onBackspacePressed}
          onExitPressed={props.onExitPressed}
          onKeyPressed={onKeyPressed}
        />
      </View>

      <Link label="Пропустить, буду использовать пароль" onPress={props.skipCode} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  errorMsg: {
    minHeight: 30,
    color: 'red',
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    textAlign: 'center',
  }
});
