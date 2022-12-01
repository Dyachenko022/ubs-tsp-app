import MyTspScreen from './MyTspScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import { lastTenDocumentsSelector } from '../../redux/history/selectors';
import { openReceipt } from '../../redux/history/actions';
import { actions as messagesActions } from '../../redux/messages/reducer';
import { getDocuments, setFilter as setFilterDoc } from '../../redux/history/actions';
import { getSubscriptions, setFilter as setFilterSubscr } from '../../redux/subscription/actions';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'MyTspScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};

const mapStateToProps = (state: IReduxState) : IMyTspScreenStateProps => ({
  avatar: state.user.avatar,
  accounts: state.accounts.accounts,
  countUnreadMessages: state.messages.countUnreadMessages,
  documents: lastTenDocumentsSelector(state),
  name: state.user.organization,
  regimeAccess: state.user.regimeAccess,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps) : IMyTspScreenDispatchProps => {
  return {
    openAccountsSummaryScreen: () => ownProps.navigation.navigate('AccountsSummaryScreen'),
    openHistoryScreen: () => {
      dispatch(setFilterDoc({period: 'Все',
                             typeOperations: undefined,
                             sumFrom: undefined,
                             sumTo: undefined,
                             state: undefined,
                             identyOfOperation: undefined,
                             searchString: undefined}));
      dispatch(getDocuments(true, 1));
      ownProps.navigation.navigate('HistoryScreen');
    },
    openNewOrderScreen: () => ownProps.navigation.navigate('NewOrderScreen'),
    openSubscriptionScreen: () => {
      dispatch(setFilterSubscr({searchString: ''}));
      dispatch(getSubscriptions(true, 1));
      ownProps.navigation.navigate('SubscriptionScreen');
    },
    openSubscriptionScreenTwo: () => {
      dispatch(setFilterSubscr({searchString: ''}));
      dispatch(getSubscriptions(true, 1));
      ownProps.navigation.navigate('SubscriptionScreenTwo');
    },
    openProfileScreen: () => ownProps.navigation.navigate('ProfileScreen'),
    openMessagesScreen: () => ownProps.navigation.navigate('MessagesScreen'),
    requestStatement: () => ownProps.navigation.navigate('AccountStatementScreen', {}),
    openAccountDetails: (account: IAccountDetails) => {
      ownProps.navigation.navigate('AccountDetailsScreen', { accountId: account.id });
    },
    fetchNewMessages: () => dispatch(messagesActions.getMessages()),
    openReceipt: (idDocument: number) => dispatch(openReceipt(idDocument)),
    openRefund: (id: number, maxAmount: number) => ownProps.navigation.push('RefundScreen', { id, maxAmount }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTspScreen);
