import React from 'react';
import TextField from '../TextField';
import { StyleProp, ViewStyle } from 'react-native';

interface IMoneyFieldProps {
  value: number | undefined,
  maxValue?: number,
  title?: string,
  placeholder?: string,
  onChange: (newValue: number | undefined) => void,
  useTopErrors?: boolean,
  error?: string,
  containerStyle?: StyleProp<ViewStyle>,
}

interface IMoneyFieldState {
  text: string,
}

export default class MoneyField extends React.Component<IMoneyFieldProps, IMoneyFieldState> {
  constructor(props: IMoneyFieldProps) {
    super(props);
    this.state = {
      text: props.value?.toString() ?? '',
    };
  }

  componentDidUpdate(prevProps: Readonly<IMoneyFieldProps>) {
    if (prevProps.value !== this.props.value) {
      this.setState({text: this.props.value?.toString() ?? ''});
    }
  }

  onChange = (newText: string) => {
    if (newText) {
      const oldText = this.state.text;
      this.setState({text: newText}, () => {
        const isDecimal = /^(\d+(\.|,)?\d{0,2}|\.\d{1,9})$/.exec(newText);
        newText = newText.replace(',', '.');
        if (!isDecimal) {
          this.setState({text: oldText});
          return;
        }
        let v = Number(newText);
        if (this.props.maxValue && v > this.props.maxValue) {
          v = this.props.maxValue;
          this.setState({ text: v.toString() });
        }
        this.props.onChange(v);
      });
    } else {
      this.props.onChange(undefined);
    }
  };

  render() {
    return (
      <TextField
        containerStyle={this.props.containerStyle}
        title={this.props.title}
        keyboardType="numeric"
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChangeText={this.onChange}
        useTopErrors={this.props.useTopErrors}
        error={this.props.error}
      />
    );
  }
}
