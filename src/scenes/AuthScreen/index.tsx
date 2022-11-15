import AuthScreen from './AuthScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import throttling from '../../utils/throttling';
import { Keyboard } from 'react-native';
import { loginWithCode, setShortCodeUsed } from '../../redux/user/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeAbonentFromListById } from '../../utils/settingsHelper';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'AuthScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};


const mapStateToProps = (state: IReduxState): IAuthScreenStateProps => {
  return {
    theme: state.theme.theme as ThemeType,
    shortCodeUsed: state.user.shortCodeUsed,
    versionAppNotification: state.settingsFront.versionApp,
    serviceNotification: state.settingsFront.serviceNotification,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps): IAuthScreenDispatchProps => ({
  onClickMap: () => ownProps.navigation.push('MapScreen'),
  onClickInfo: () => ownProps.navigation.push('AboutScreen'),
  onClickForgot: () => ownProps.navigation.push('ForgotPasswordScreen'),
  onClickAuth: async (login: string) => {
    Keyboard.dismiss();
    await throttling();
    ownProps.navigation.push('PasswordEnterScreen', { login: login.toLowerCase() });
  },
  onSelectAbonent: async (abonent: AbonentListEntry) => {
    if (abonent.useShortCode) {
      void AsyncStorage.setItem('contractId', abonent.contractId.toString());
      void AsyncStorage.setItem('uid', abonent.uid);
      await dispatch(setShortCodeUsed(true));
    } else {
      Keyboard.dismiss();
      await throttling();
      ownProps.navigation.push('PasswordEnterScreen', { login: abonent.login });
    }
  },
  onStopUsingShortCode: async () => {
    const contractId = Number.parseInt(await AsyncStorage.getItem( 'contractId') || '');
    await removeAbonentFromListById(contractId);
    await dispatch(setShortCodeUsed(false));
  },
  onLoginByCode: (code: string) => dispatch(loginWithCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
