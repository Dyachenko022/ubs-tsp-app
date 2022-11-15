import MessagesScreen from './MessagesScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { actions } from '../../redux/messages/reducer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../rootStackParamList';
import { readMessage } from '../../redux/messages/api';
import { Alert } from 'react-native';

type OwnProps = NativeStackScreenProps<RootStackParamList, 'MessagesScreen'>;

const mapStateToProps = (state: IReduxState): IMessagesScreenStateProps => ({
  isLoading: state.messages.loading,
  filterType: state.messages.type,
  messages: state.messages.messages,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps): IMessagesScreenDispatchProps => {

  const getFiles = async (guid: string) => {
    try {
      const response = await readMessage(guid);
      return response.files;
    } catch (e) {
      Alert.alert('Ошибка', e.textMessage ?? 'Не удалось получить файлы,' +
        'пожалуйста, обратитесь в банк.');
      throw e;
    }
  };

  return {
    changeMessagesType: (filterType: 'incoming' | 'sent') => {
      dispatch(actions.setFilter(filterType));
      void dispatch(actions.getMessages());
    },
    updateMessages: () => dispatch(actions.getMessages()),
    loadMoreMessages: (numPages: number) => {
      void dispatch(actions.getMessages(numPages));
    },
    openSendMessageToBankScreen: () => ownProps.navigation.push('MessageToBankScreen'),
    onPressMessage: (message: IMessage) => {
      ownProps.navigation.push('MessageModal', {
        message,
        markAsRead: (guid: string) => dispatch(actions.markAsRead(guid)),
        getFiles,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
