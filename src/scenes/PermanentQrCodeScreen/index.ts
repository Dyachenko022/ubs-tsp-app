import { connect } from 'react-redux';
import { Alert } from 'react-native';
import PermanentQrCodeScreen, { navigationProps } from './PermanentQrCodeScreen';
import { AppDispatch } from '../../redux/store';
import { makePermanentQrCode, makeCashLink } from '../../redux/permanentQrCode/api';
import { shareFile, shareImageBase64 } from '../../utils/shareFile';
import { PLEASE_CALL_BANK } from '../../utils/K';

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: navigationProps): IPermanentQrCodeScreenDispatchProps => ({
  requestPermanentQrCode: async (sum: number, description: string) => {
    try {
      if (ownProps.route.params.mode === 'permanentQrCode') {
        const response = await makePermanentQrCode(sum, description);
        return {
          uri: response.file,
          isFile: true,
        };
      } else {
        const response = await makeCashLink(description);
        return {
          uri: `data:image/png;base64,${response.qrcImage}`,
          isFile: false,
        };
      }
    } catch (ex) {
      let errorText = PLEASE_CALL_BANK;
      if (ex instanceof RequestException) {
        if (ex.codeResult === 1) errorText = ex.textResult;
      }
      Alert.alert('Ошибка', errorText);
      throw ex;
    }
  },
  onSendQrCodePress: (qrCodeSource: UirFile) => {
    if (qrCodeSource.isFile) {
      void shareFile(qrCodeSource.uri);
    } else {
      void shareImageBase64(qrCodeSource.uri, 'Кассовая ссылка');
    }
  }
});

export default connect(null, mapDispatchToProps)(PermanentQrCodeScreen);
