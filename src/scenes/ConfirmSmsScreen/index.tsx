import ConfirmSmsScreen from './ConfirmSmsScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { getCodeSms, confirmCode, restoreAccessConfirm } from '../../redux/user/actions';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as api from '../../redux/user/api';
import { setJwt } from '../../utils/apiFabric';
import * as types from '../../redux/user/types';

type OwnProps = NativeStackScreenProps<RootStackParamList, 'ConfirmSmsScreen'>;

const mapStateToProps = (state: IReduxState, ownProps: OwnProps): IConfirmSmsCodeStateProps => ({
  phoneSending: state.user.confirmCodeSms.phoneSending,
  liveTime: state.user.confirmCodeSms.timeToLive,
  dateGenerate: state.user.confirmCodeSms.dateGenerate,
  mode: ownProps.route.params.mode,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps): IConfirmSmsCodeDispatchProps => ({
  confirmCode: (code: string) => {
    if (ownProps.route.params.mode === 'registerApp') {
      dispatch(confirmCode(code));
    } else {
      void dispatch(restoreAccessConfirm(ownProps.route.params.login!, code));
    }
  },
  refreshCode: async () => {
    if (ownProps.route.params.mode === 'registerApp') {
      await dispatch(getCodeSms());
    } else {
      const { phone, login, inn } = ownProps.route.params;
      const response = await api.restoreAccess(phone!, login!, inn!);
      setJwt(response.jwt);
      const { phoneSending, liveTime, dateGenerate } = response;
      dispatch({ type: types.GET_CODE_SMS_REQ_SUC, payload: {
        phoneSending, liveTime, dateGenerate
      }});
    }
  },
});

// Непонтяно, почему у ConfirmSmsScreen тип - never...
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSmsScreen);
