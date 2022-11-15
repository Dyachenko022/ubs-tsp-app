import AccountsSummaryScreen from './AccountsSummaryScreen';
import { connect } from 'react-redux';
import { IReduxState } from '../../redux/store';

const mapStateToProps = (state: IReduxState) => {
  const totalSum = state.accounts.accounts.reduce((sum, account) => sum + account.balance, 0);
  return {
    totalSum,
    accounts: state.accounts.accounts,
  };
};

export default connect(mapStateToProps)(AccountsSummaryScreen);
