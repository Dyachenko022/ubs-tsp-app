import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import ThemedText from '../Themed/Text';
import { Text, WheelPicker, Picker } from 'react-native-ui-lib';
import BankTheme from '../../bankTheme';
import ArrowRightIcon from '../../../assets/arrowRight.svg';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../utils/K';

interface ISelectInputProps {
  placeholder?: string,
  title?: string,
  onSelectValue: (value: string | number) => void,
  selectedValue: string,
  options: Array<{
    label: string,
    value: number | string,
  }>,
}

export default function SelectInput(props: ISelectInputProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>(props.options[0].value);
  const isDark = useTheme().dark;

  const onSelectValue = useCallback(() => {
    props.onSelectValue(selectedValue);
    setModalVisible(false);
  }, [selectedValue]);

  let visibleText: string | undefined;
  if (props.selectedValue) {
    visibleText = props.options.find((item) => item.value === props.selectedValue)?.label;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>

      {props.title !== undefined && (
        <ThemedText small color="gray">
          {props.title}
        </ThemedText>
      )}

      <View style={styles.row}>
        <Text color="gray" body>
          {visibleText || props.placeholder || 'Выберите значение'}
        </Text>

        <ArrowRightIcon stroke={BankTheme.colors.link} width={15} height={20} />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        style={{backgroundColor: 'white'}}
      >
        <View style={styles.modalContainer}>
          <View style={{ ...styles.wheelPickerContainer, backgroundColor: isDark ? MODAL_DARK : 'white',}}>
            <View style={styles.buttonRowModal}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <ThemedText>
                  Отмена
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity onPress={onSelectValue}>
                <ThemedText>
                  Применить
                </ThemedText>
              </TouchableOpacity>
            </View>
            <WheelPicker
              selectedValue={selectedValue}
              onValueChange={setSelectedValue}
              itemStyle={{ color: isDark ? 'white' : 'black' }}
            >
              {props.options.map((item) => (
                <Picker.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </WheelPicker>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  buttonRowModal: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, wheelPickerContainer : {
    height: '30%',
    alignItems: Platform.OS === 'ios' ? undefined : 'center'
  }
});
