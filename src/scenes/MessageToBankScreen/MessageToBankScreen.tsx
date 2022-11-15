import React from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import TextField from '../../components/Themed/TextField';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import SelectInput from '../../components/SelectInput';
import FileUpload, { FileData } from '../../components/FileUpload';
import Button from '../../components/Button';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';

export type MessageToBankScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'AccountDetailsScreen'>;

type IMessageToBankScreenProps = {
  send: (topic: string, text: string, files: Array<FileData>) => Promise<void>,
} & MessageToBankScreenNavigationProps;

interface IMessageToBankScreenState {
  messageTopic: string,
  text: string,
  files: Array<FileData>,
}

export default class MessageToBankScreen extends React.Component<IMessageToBankScreenProps, IMessageToBankScreenState> {

  constructor(props: IMessageToBankScreenProps) {
    super(props);
    this.state = {
      messageTopic: '',
      text: '',
      files: [],
    };
  }

  messageTopics = [{
    label: 'Жалоба',
    value: 'Жалоба',
  }, {
    label: 'Предложение',
    value: 'Предложение',
  }]

  onSendPressed = () => {
    void this.props.send(this.state.messageTopic, this.state.text, this.state.files);
  }

  render() {
    return (
      <ThemedSafeAreaView modal style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <ModalScreenHeader onClose={() => this.props.navigation.pop()} title="Сообщение в банк" />
          <ScrollView keyboardDismissMode="interactive">
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
              <View style={styles.fieldWithPadding}>
                <SelectInput
                  title="Тема сообщения"
                  placeholder="Выберите тему сообщения"
                  onSelectValue={(messageTopic) => this.setState({ messageTopic: messageTopic as string })}
                  selectedValue={this.state.messageTopic}
                  options={this.messageTopics}
                />
              </View>

              <View style={styles.fieldWithPadding}>
                <TextField
                  placeholder="Введите текст"
                  title="Текст сообщения"
                  value={this.state.text}
                  onChangeText={(text) => this.setState({ text })}
                  multiline
                />
              </View>

              <View style={{paddingHorizontal: 16}}>
                <FileUpload
                  files={this.state.files}
                  onFilesChanged={(files) => this.setState({ files })}
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={{paddingHorizontal: 16, bottom: 0}}>
          <Button
            filled
            disabled={!this.state.messageTopic || !this.state.text}
            label="Отправить"
            onPress={this.onSendPressed}
          />
        </View>
      </ThemedSafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  fieldWithPadding: {
    paddingHorizontal: 16,
    marginBottom: 20,
  }
});
