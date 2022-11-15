import ForgotPasswordScreen from './ForgotPasswordScreen';
import { connect } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { restoreAccess } from '../../redux/user/actions';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type OwnProps = NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>;

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps) => ({
  restoreAccess: (phone: string, inn: string) => {
    const login = ownProps.route.params.login;
    void dispatch(restoreAccess(phone, login, inn));
  }
});

export default connect(null, mapDispatchToProps)(ForgotPasswordScreen);
