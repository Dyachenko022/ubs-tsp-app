import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import SubscriptionScreen from './SubscriptionScreen';
import { AppDispatch, IReduxState } from '../../redux/store';
import { getSubscriptions, deleteSubscription, setFilter } from '../../redux/subscription/actions';
import { RootStackParamList } from '../../rootStackParamList';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'SubscriptionScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};

const mapStateToProps = (state: IReduxState): ISubscriptionScreenStateProps => ({
  subscriptions: state.subscriptions.subscriptions,
  loading: state.subscriptions.loading,
  countSubscriptions: state.subscriptions.countSubscriptions,
  filter: state.subscriptions.filter,
  regimeAccess: state.user.regimeAccess,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatch
});

const mergeProps = (stateProps: ISubscriptionScreenStateProps, dispatchProps: { dispatch: AppDispatch }, ownProps: OwnProps) => {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    getSubscriptions: (numPage: number) => {
      dispatch(getSubscriptions(true, numPage));
    },
    getSubscriptionsWithSearch: (searchString: string) => {
      dispatch(setFilter({...stateProps.filter, searchString: searchString}));
      void dispatch(getSubscriptions(true, 1));
    },
    openCreateSubscriptionScreen: () => ownProps.navigation.push('SubscriptionCreateScreen'),
    deleteSubscription: (id: number) => {
      dispatch(deleteSubscription(id));
      void dispatch(getSubscriptions(true, 1));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SubscriptionScreen);
