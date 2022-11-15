import React, { useState } from 'react';
import CodeKeyboard from '../../../components/Themed/CodeKeyboard';
import { View } from 'react-native';
import ThemedText from '../../../components/Themed/Text';

interface IEnterByShortCodeProps {
  abonentName: string,
  onCodeEnter: (code: string) => Promise<unknown>,
  onExitPressed: () => void,
}

export default function EnterByShortCode(props: IEnterByShortCodeProps) {
  const [code, setCode] = useState('');

  const onBackspacePressed = () => {
    if (code.length > 0) {
      setCode(code.slice(0, code.length - 1));
    }
  };

  const onKeyPressed = (key: string) => {
    const newCode = code + key;
    if (newCode.length > 4) return;
    setCode(newCode);
    if (newCode.length === 4) {
      props.onCodeEnter(newCode)
        .catch(() => setCode(''));
    }
  };

  const renderBubbles = () => {
    const bubbles = [];
    for (let i=0; i<4; i++ ) {
      const backgroundColor = i < code.length ? 'green' : '#C4C4C4';

      bubbles.push(
        <View key={i} style={{width: 12, height: 12, margin: 5, backgroundColor, borderRadius: 8}} />
      );
    }
    return (
      <View style={{flexDirection: 'row', alignItems: 'center',  width: '100%', paddingTop: 10, }}>
        {bubbles}
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>

      <ThemedText heading marginT-32>
        Добро пожаловать, {props.abonentName}
      </ThemedText>

      <ThemedText body marginV-16>
        Укажите короткий код для входа
      </ThemedText>

      {renderBubbles()}

      <View style={{alignSelf: 'center', marginVertical: 32}}>
        <CodeKeyboard
          onBackspacePressed={onBackspacePressed}
          onKeyPressed={onKeyPressed}
          showExitButton
          onExitPressed={props.onExitPressed}
        />
      </View>
    </View>
  );
}
