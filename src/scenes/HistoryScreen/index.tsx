import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import HistoryScreen from './HistoryScreen';
import { AppDispatch, IReduxState } from '../../redux/store';
import { getDocuments, openReceipt, setFilter } from '../../redux/history/actions';
import { RootStackParamList } from '../../rootStackParamList';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'HistoryScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};

const mapStateToProps = (state: IReduxState): IHistoryScreenStateProps => ({
  documents: state.history.documents,
  loading: state.history.loading,
  countOpers: state.history.countOpers,
  filter: state.history.filter,
  regimeAccess: state.user.regimeAccess,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  dispatch
});

const mergeProps = (stateProps: IHistoryScreenStateProps, dispatchProps: { dispatch: AppDispatch }, ownProps: OwnProps) => {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    getDocuments: (numPage: number) => dispatch(getDocuments(false, numPage)),
    getDocumentsWithSearch: (searchString: string) => {
      dispatch(setFilter({...stateProps.filter, searchString: searchString}));
      void dispatch(getDocuments(true, 1));
    },
    openFilterScreen: () => ownProps.navigation.push('HistoryFilterScreen'),
    openExportDocumentsScreen: () => ownProps.navigation.push('ExportDocumentsScreen'),
    openRefund: (id: number, maxAmount: number) => ownProps.navigation.push('RefundScreen', { id, maxAmount }),
    openReceipt: (idDocument: number) => dispatch(openReceipt(idDocument)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HistoryScreen);
