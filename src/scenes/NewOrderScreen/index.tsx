import NewOrderScreen from './NewOrderScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { placeOrder, setItems } from '../../redux/orderPlacement/actions';
import { getSubscriptions, setFilter } from '../../redux/subscription/actions';

const mapStateToProps = (state: IReduxState) : INewOrderScreenStateProps => ({
  nds: state.settings.nds,
  totalSum: state.orderPlacement.totalSum,
  ndsSum: state.orderPlacement.ndsSum,
  items: state.orderPlacement.items,
  subscriptions: state.subscriptions.subscriptions,
});

const mapDispatchToProps = (dispatch: AppDispatch) : INewOrderScreenDispatchProps => ({
  placeOrder: (withCashLink: boolean, items: IOrderEntry[], nds: number, totalSum: number, 
               type?: string, subscrPurpose?: string, subscrPayerId?: string, subscrId?: number) => {
    dispatch(placeOrder(withCashLink, items, nds, totalSum, type, subscrPurpose, subscrPayerId, subscrId));
  },
  setItems: (items: IOrderEntry[]) => {
    dispatch(setItems(items));
  },

  getSubscriptions: (searchString: string) => {
    if(searchString != '') dispatch(setFilter({searchString: searchString}));
    dispatch(getSubscriptions(true, 1));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewOrderScreen);
