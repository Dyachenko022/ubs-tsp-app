import PasswordEnterScreen from './PasswordEnterScreen';
import { connect } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AUTH_LOGIN_PASSWORD } from '../../redux/user/types';

type OwnProps  = {
  navigation: StackNavigationProp<RootStackParamList, 'PasswordEnterScreen'>,
} & NativeStackScreenProps<RootStackParamList, 'PasswordEnterScreen'>;

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps) => ({
  onPressAuth: (password: string) => {
    const login = ownProps.route.params.login;
    dispatch({type: AUTH_LOGIN_PASSWORD, payload: { login, password }});
  },
  onPressForgot: () => ownProps.navigation.push('ForgotPasswordScreen', { login: ownProps.route.params.login }),
});

export default connect(null, mapDispatchToProps)(PasswordEnterScreen);
