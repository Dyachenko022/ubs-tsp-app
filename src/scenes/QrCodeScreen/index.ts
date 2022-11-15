import { connect} from 'react-redux';
import QrCodeScreen from './QrCodeScreen';
import { AppDispatch, IReduxState } from '../../redux/store';
import { MODAL_CLOSED, setItems } from '../../redux/orderPlacement/actions';
import { getDocuments } from '../../redux/history/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSubscriptions } from '../../redux/subscription/actions';
import { produceWithPatches } from 'immer';
import { stateMessage } from '../../redux/messages/api';
import { State } from 'react-native-gesture-handler';

export type OwnProps  = {
  navigation: StackNavigationProp<RootStackParamList, 'QrCodeScreen'>,
} & NativeStackScreenProps<RootStackParamList, 'QrCodeScreen'>;

const mapStateToProps = (state: IReduxState, ownProps: OwnProps) : IQrCodeScreenStateProps => ({
  isCashLink: ownProps.route.params.mode === 'cashLink',
  mode: ownProps.route.params.mode,
  totalSum: state.orderPlacement.totalSum,
  qrCodeBase64: state.orderPlacement.qrCodeBase64,
  qrCodeStatus: state.orderPlacement.qrCodeStatus,
  qrCodeFailureText: state.orderPlacement.qrCodeFailureText,
  tspName: state.user.organization,
  tspAddress: state.user.address,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps): IQrCodeScreenDispatchProps=> ({
  onClose: (mode: string) => {
    dispatch({
      type: MODAL_CLOSED,
    });

    void dispatch(setItems([]));
    
    if(mode != 'subscrLink')
      void dispatch(getDocuments());
    else {
      ownProps.navigation.navigate('SubscriptionScreen')
      void dispatch(getSubscriptions());
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScreen);
