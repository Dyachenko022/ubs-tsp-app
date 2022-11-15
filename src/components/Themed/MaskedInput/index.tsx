import React from 'react';
import TextField from '../TextField';

interface IMaskedInputProps {
  mask: string,
  error?: string,
  onChangeText: (text: string) => void,
  title?: string,
  placeholder?: string,
  value?: string,
  useTopErrors?: boolean,
}

interface IMaskedInputState {
  value: string,
}

export default class MaskedInput extends React.Component<IMaskedInputProps , IMaskedInputState> {
  constructor(props: IMaskedInputProps ) {
    super(props);
    this.state = {
      value: this.applyMask(props.value ?? ''),
    };
  }

  componentDidUpdate(prevProps: Readonly<IMaskedInputProps>, prevState: Readonly<IMaskedInputState>, snapshot?: any) {
    if(prevProps.value !== this.props.value && this.props.value) {
      const maskedText = this.applyMask(this.props.value);
      this.setState({value: maskedText});
    }
  }

  checkOnlyMaskSymbols = (text: string) => {
    const mask = this.props.mask;
    let onlyMask = true;
    for (let i=0; i < text.length; i++) {
      if (text[i] !== mask[i] || mask[i] === '0') {
        onlyMask = false;
        break;
      }
    }
    return onlyMask;
  }

  clearMask = (rawText: string) => {
    const { mask } = this.props;
    let q = 0;
    for (let i=0; i<mask.length; i++) {
      if (rawText[q] === mask[i] && mask[i] !== '0') {
        rawText = (q > 1 ? rawText.substring(0, q) : '') + rawText.substring(q + 1);
      } else {
        q+=1;
      }
    }
    return rawText;
  }

  applyMask = (rawText: string): string => {
    const { mask } = this.props;
    let maskedText = '';
    let rawTextPos = 0;
    if (!rawText) return '';
    if (rawText.length > mask.length) rawText = rawText.substring(0, mask.length);

    // Удалим все вообще, если у нас только маска
    if (this.checkOnlyMaskSymbols(rawText)) {
      return '';
    }

    // Выкинем уже примененную маску
    rawText = this.clearMask(rawText);

    for(let i=0; i<mask.length; i++) {
      if (mask[i] !== '0') {
        maskedText += mask[i];
      } else {
        for (rawTextPos; rawTextPos < rawText.length; rawTextPos ++) {
          const c = rawText[rawTextPos];
          if (c >= '0' && c <= '9') {
            maskedText += c;
            break;
          }
        }
        rawTextPos +=1;
        if (rawTextPos >= rawText.length) break;
      }
    }
    return maskedText;
  }

  onChangeText = (rawText: string) => {
    const maskedText = this.applyMask(rawText);
    this.setState({value: maskedText});
    this.props.onChangeText && this.props.onChangeText(maskedText);
  }

  render() {
    return (
      <TextField
        alwaysRefreshValue
        error={this.props.error}
        placeholder={this.props.placeholder}
        title={this.props.title}
        value={this.state.value}
        onChangeText={this.onChangeText}
        useTopErrors={this.props.useTopErrors}
      />
    );
  }
}
