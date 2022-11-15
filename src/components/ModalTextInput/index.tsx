import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import ThemedTextField from '../Themed/TextField';
import Button from '../Button';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../utils/K';
import ThemedText from '../Themed/Text';

interface IModalTextInputProps {
  description: string,
  visible: boolean,
  defaultValue?: string,
  onClose: () => void,
  onTextEntered: (text: string) => void,
}

export default function ModalTextInput(props: IModalTextInputProps) {
  const [text, setText] = useState('');
  const isDark = useTheme().dark;
  // Для того, чтобы автофокусировка работала
  // отобразить текстФилд нужно после отображения модальной формы
  const [showTextField, setShowTextField] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(props.visible);
    if (props.visible) {
      setText(props.defaultValue ?? '');
      setTimeout(() => setShowTextField(true), 100);
    } else {
      setShowTextField(false);
    }
  }, [props.visible]);

  const close = useCallback(() => {
    setVisible(false);
    props.onClose();
  }, []);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, backgroundColor: isDark ? MODAL_DARK : 'white' }}>
          <ThemedText style={styles.modalText}>
            {props.description}
          </ThemedText>
          <View style={{width: '100%'}}>
            {showTextField  && (
              <ThemedTextField
                autoFocus
                value={text}
                onChangeText={setText}
              />
            )}
          </View>

          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
            <Button label="Отмена" onPress={close} marginR-16 />
            <Button label="ОК" filled onPress={() => {
              props.onTextEntered(text);
              setVisible(false);
            }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: '85%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
