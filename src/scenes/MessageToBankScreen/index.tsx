import { connect } from 'react-redux';
import MessageToBankScreen, { MessageToBankScreenNavigationProps } from './MessageToBankScreen';
import { AppDispatch } from '../../redux/store';
import { FileData } from '../../components/FileUpload';
import { addDocumentFiles, execute } from '../../redux/document/api';
import { transliterate } from '../../utils/text';
import { showErrorPopup, showPopup } from '../../redux/globalPopup/actions';
import { actions as messagesActions } from '../../redux/messages/reducer';

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: MessageToBankScreenNavigationProps) => ({
  send: async (topic: string, text: string, files: Array<FileData>) => {
    try {
      const parameters: IParameter[] = [
        {
          name: 'Код вида документа',
          value: 'UBS_MESSAGE',
          type: 'string',
          typeColumns: null,
        }, {
          name: 'Сообщение.Заголовок',
          value: topic,
          type: 'string',
          typeColumns: null,
        }, {
          name: 'Документ.Назначение платежа',
          value: text,
          type: 'string',
          typeColumns: null,
        }, {
          name: 'Документ.Список файлов',
          value: files.map((file) => [file.fileName, transliterate(file.fileName)]),
          type: 'array',
          typeColumns: ['string', 'string']
        }];

      ownProps.navigation.push('GlobalLoader');
      const response = await execute('create', 'UBS_MESSAGE', parameters);
      const idDocumentParam = response.values.find((value) => value.name === 'Идентификатор документа');
      if (!idDocumentParam) throw new Error('Не найден идентификатор документа!');

      parameters.push(idDocumentParam);
      if (files.length > 0) {
        await addDocumentFiles(idDocumentParam.value, files);
      }

      await execute('verify', 'UBS_MESSAGE', parameters);
      await execute('processDocument', 'UBS_MESSAGE', parameters);
      await dispatch(messagesActions.getMessages());
      ownProps.navigation.pop(2);
      dispatch(showPopup('Сообщение отправлено в банк!', 'success'));
    } catch (ex) {
      ownProps.navigation.pop();
      dispatch(showErrorPopup(ex));
    }
  }
});

export default connect(null, mapDispatchToProps)(MessageToBankScreen);
