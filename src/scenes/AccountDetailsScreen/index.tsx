import AccountDetailsScreen from './AccountDetailsScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setDescriptionAccountAndRefresh } from '../../redux/accounts/actions';
import { errorPopupHelper, showErrorPopup, showPopup } from '../../redux/globalPopup/actions';
import { getAccountDetails } from '../../redux/accounts/api';

export type AccountDetailsScreenNavigationProps  = {
  navigation: StackNavigationProp<RootStackParamList, 'AccountDetailsScreen'>,
} & NativeStackScreenProps<RootStackParamList, 'AccountDetailsScreen'>;

const mapStateToProps = (state: IReduxState, ownProps: AccountDetailsScreenNavigationProps) => ({
  account: state.accounts.accounts.find(account => account.id === ownProps.route.params.accountId)!,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({ dispatch });

const mergeProps = (stateProps: { account: IAccountDetails}, dispatchProps: { dispatch: AppDispatch}, ownProps: AccountDetailsScreenNavigationProps) => {
  const { account } = stateProps;
  const { dispatch } = dispatchProps;
  return {
    account,
    setNewAccountName: async (name: string) => {
      try {
        await dispatch(setDescriptionAccountAndRefresh(ownProps.route.params.accountId, name));
        dispatch(showPopup('Название счета изменено', 'success'));
      } catch (e) {
        dispatch(errorPopupHelper(e as RequestException));
      }
    },
    onPressShowAccountDetails: async () => {
      try {
        ownProps.navigation.navigate('GlobalLoader');
        const response = await getAccountDetails(ownProps.route.params.accountId);
        ownProps.navigation.goBack();
        ownProps.navigation.navigate('PdfViewerScreen', { file: response.file, headerTitle: 'Реквизиты' });
      } catch (e) {
        dispatch(showErrorPopup(e));
        ownProps.navigation.goBack();
      }
    },
    onPressRestrictionsDetails: () => ownProps.navigation.navigate('RestrictionsDetailsScreen', {
      restrictions: account.restrictions,
    }),
    getStatement: () => {
      const { accountId } = ownProps.route.params;
      ownProps.navigation.push('AccountStatementScreen', { accountId });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountDetailsScreen);
