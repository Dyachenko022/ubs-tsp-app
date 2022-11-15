import React from 'react';
import {
  BackHandler,
  NativeEventSubscription,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import ThemedText from '../../components/Themed/Text';
import ThemedTextField from '../../components/Themed/TextField';
import BankTheme from '../../bankTheme';
import Button from '../../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import AutosizeImage from '../../components/AutosizeImage';

interface IConfirmSmsScreenState {
  code: string,
  seconds: number,
}

interface IConfirmSmsScreenProps extends IConfirmSmsCodeStateProps, IConfirmSmsCodeDispatchProps {
  navigation: StackNavigationProp<RootStackParamList, 'ConfirmSmsScreen'>,
}

export default class ConfirmSmsScreen extends React.Component<IConfirmSmsScreenProps, IConfirmSmsScreenState> {
  state = {
    code: '',
    seconds: 270
  }
  timer: NodeJS.Timer | undefined;
  backButtonHandler?: NativeEventSubscription;

  componentDidMount() {
    this.onCodeRefresh();
    this.backButtonHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentDidUpdate(prevProps: Readonly<IConfirmSmsCodeStateProps>) {
    if (prevProps.dateGenerate !== this.props.dateGenerate) {
      this.onCodeRefresh();
    }
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
    this.backButtonHandler?.remove();
  }

  onBackPress = () => {
    this.props.navigation.popToTop();
    return true;
  }

  onCodeRefresh = () => {
    if (this.timer) clearInterval(this.timer);
    this.setState({
      code: '',
      seconds: 270,
    });
    this.timer = setInterval(this.timerCallback, 1000);
  }

  timerCallback = () => {
    let { seconds } = this.state;
    seconds -=1;
    if (seconds === 0 && this.timer) {
      clearInterval(this.timer);
    }
    this.setState({ seconds });
  }

  onChangeCode = (code: string) => {
    this.setState({ code });
    if (code.length >= 5) this.props.confirmCode(code);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <AutosizeImage maxHeight={60} source={BankTheme.images.loginPageLogo} containerStyle={styles.logo} />

          <ThemedText heading marginB-16>
            {this.props.mode === 'forgotPassword' ? 'Восстановление доступа' : 'Подтверждение регистрации'}
          </ThemedText>

          <ThemedText style={{ fontSize: 17, }}>
            Мы отправили SMS-сообщение с кодом активации на номер
            <ThemedText style={{ fontWeight: 'bold' }}>
              &nbsp;{this.props.phoneSending}.
            </ThemedText>
          </ThemedText>
          <ThemedText style={{ fontSize: 17 }} marginB-16>
            Введите этот код
          </ThemedText>

          {this.state.seconds > 0 ?
            <View>
              <ThemedTextField
                autoFocus
                title="Код"
                keyboardType="decimal-pad"
                style={{ fontSize: 32 }}
                containerStyle={{ width: 100 }}
                maxLength={5}
                value={this.state.code}
                onChangeText={this.onChangeCode}
              />

              <ThemedText>
                Срок действия {this.state.seconds} сек
              </ThemedText>
            </View>
            :
            <View>
              <ThemedText>
                Срок действия истек
              </ThemedText>
              <Button label="Отправить код повторно" onPress={this.props.refreshCode} />
            </View>
          }

          <ThemedText small marginT-32>
            Не сообщайте никому код, даже сотруднику банка
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 24,
  },
});
