import ExportDocumentsScreen from './ExportDocumentsScreen';
import { connect } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { extractRbDoc } from '../../redux/history/api';
import { shareFile } from '../../utils/shareFile';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { withLoaderModal } from '../../utils/withLoaderModal';
import { PLEASE_CALL_BANK } from '../../utils/K';
import { RequestException } from '../../utils/apiFabric';
import { Alert } from 'react-native';

type OwnProps  = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AccountDetailsScreen'>,
};

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps): IExportDocumentsScreenProps => ({
  close: () => ownProps.navigation.pop(),
  extractDocuments: async (typeOfFile: TypeOfFile, period: TypeOfPeriod, typeOfDocument: TypeOfDocument,
    status: TypeOfStatus) => {

    try {
      const file = (await withLoaderModal(extractRbDoc(typeOfFile, period, typeOfDocument, status))).file;

      // Huawei даже при успешной отправке файла почему-то выкидывает exceiption
      try {
        await shareFile(file);
      } catch (err) {
        console.error(err);
      }
      ownProps.navigation.pop();
    } catch (e) {
      console.error(e);
      let errorText = PLEASE_CALL_BANK;
      if (e instanceof RequestException) {
        if (e.codeResult === 1) errorText = e.textResult;
      }
      Alert.alert('Ошибка', errorText);
      return;
    }
  }
});

export default connect(null, mapDispatchToProps)(ExportDocumentsScreen);
