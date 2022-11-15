import HistoryFilterScreen from './HistoryFilterScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { getDocuments, setFilter } from '../../redux/history/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'HistoryFilterScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};

const mapStateToProps = (state: IReduxState): IHistoryFilterScreenStateProps => ({
  filter: state.history.filter,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps): IHistoryFilterScreenDispatchProps => ({
  applyFilter: (filter) => {
    dispatch(setFilter(filter));
    ownProps.navigation.pop();
    void dispatch(getDocuments(true));
  },
  close: () => ownProps.navigation.pop(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryFilterScreen);
