import AccountStatementScreen, { NavigationProps } from './AccountStatementScreen';
import { connect } from 'react-redux';
import { RequestException } from '../../utils/apiFabric';
import { AppDispatch, IReduxState } from '../../redux/store';
import { extract, IExtractRes } from '../../redux/accounts/api';
import { shareFile } from '../../utils/shareFile';
import { PLEASE_CALL_BANK } from '../../utils/K';
import { Alert } from 'react-native';

const mapStateToProps = (state: IReduxState) => ({
  accounts: state.accounts.accounts,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: NavigationProps) => ({
  getStatement: async (idAccount: number, dateFrom: Date, dateTo: Date, fileFormat: string) => {
    ownProps.navigation.push('GlobalLoader');
    let response: IExtractRes | undefined;
    try {
      response = await extract(idAccount, dateFrom, dateTo, fileFormat === 'pdf' ? 'pdf' : '1C');
    } catch (e) {
      console.error(e);
      let errorText = PLEASE_CALL_BANK;
      if (e instanceof RequestException) {
        if (e.codeResult === 1) errorText = e.textResult;
      }
      Alert.alert('Ошибка', errorText);
      return;
    } finally {
      ownProps.navigation.pop(2);
    }
    await shareFile(response.file);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatementScreen);
