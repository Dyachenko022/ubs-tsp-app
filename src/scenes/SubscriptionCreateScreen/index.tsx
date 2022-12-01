import SubscriptionCreateScreen, { OwnNavigationProp } from './SubscriptionCreateScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { makeSubscrQrCode } from '../../redux/subscriptionCreate/api';
import { placeOrder, setItems } from '../../redux/orderPlacement/actions';

const mapStateToProps = (state: IReduxState) : ISubscriptionCreateScreenStateProps => ({
  subscrPurpose: state.subscriptionCreate.subscrPurpose,
  subscrPayerId: state.subscriptionCreate.subscrPayerId,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnNavigationProp): ISubscriptionCreateScreenDispatchProps => ({
  makeSubscrQrCode: (subscrPurpose: string, subscrPayerId: string) => {
    //Предложите клиенту отсканировать QR-код для подтверждения привязки счета
    dispatch(placeOrder(false, [], 0, 0, 'subscr', subscrPurpose, subscrPayerId));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionCreateScreen);
