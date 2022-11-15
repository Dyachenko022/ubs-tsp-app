import React from 'react';
import { TextInput } from 'react-native';

interface ISearchTextInputProps {
  getDocuments: (searchString: string) => void,
}

interface ISearchTextInputState {
  value: string,
}

export default class SearchTextInput extends React.Component<ISearchTextInputProps, ISearchTextInputState> {
  state: ISearchTextInputState = {
    value: '',
  }

  timer: NodeJS.Timeout | null = null;

  updateSearch = (text: string) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.timeout, 2000);
    this.setState({ value: text });
  }

  timeout = () => {
    this.props.getDocuments(this.state.value);
  }

  onSubmit = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timeout();
  }

  render() {
    return (
      <TextInput
        clearButtonMode="always"
        value={this.state.value}
        onSubmitEditing={this.onSubmit}
        onChangeText={this.updateSearch}
        placeholder="Поиск"
        style={{ width: '70%', backgroundColor: 'rgba(rgba(118, 118, 128, 0.12)', borderRadius: 10, padding: 8 }}
      />
    );
  }
}
