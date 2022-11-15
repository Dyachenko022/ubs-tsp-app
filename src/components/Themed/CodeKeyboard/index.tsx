import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text';
import BackspaceIcon from '../../../../assets/backspace.svg';
import Link from '../../Link';
import { useTheme } from '@react-navigation/native';

interface ICodeKeyboard {
  onKeyPressed: (char: string) => void,
  onExitPressed?: () => void,
  onBackspacePressed: () => void,
  showExitButton?: boolean,
}

export default function CodeKeyboard(props: ICodeKeyboard) {
  const isDark = useTheme().dark;
  const buttonStyle = {...styles.button};
  if (isDark) {
    buttonStyle.backgroundColor = 'rgba(255,255,255,0.1)';
  }

  const renderButton = (char: string) => {
    return (
      <TouchableOpacity style={buttonStyle} key={char} onPress={() => props.onKeyPressed(char)}>
        <Text style={{fontSize: 32}}>
          {char}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{width: 281}}>
      <View style={styles.row}>
        {['1','2','3'].map((item) => renderButton(item))}
      </View>
      <View style={styles.row}>
        {['4','5','6'].map((item) => renderButton(item))}
      </View>
      <View style={styles.row}>
        {['7','8','9'].map((item) => renderButton(item))}
      </View>
      <View style={styles.row}>
        <View style={{...styles.button, backgroundColor: 'transparent'}}>
          {props.showExitButton && (
            <Link label="Выход" onPress={props.onExitPressed} />
          )}
        </View>

        {renderButton('0')}

        <TouchableOpacity style={buttonStyle} onPress={props.onBackspacePressed}>
          <BackspaceIcon width={38} height={30} fill={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 45, backgroundColor: '#ECF0F6', width: 65, height: 65, alignItems: 'center', justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    width: '100%',
  }
});
