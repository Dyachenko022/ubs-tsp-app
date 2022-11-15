import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ThemedText from '../../../components/Themed/Text';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../../utils/K';

interface IDoubleDateInputModalProps {
  visible: boolean;
  onDatesSelected: (dateFrom: Date, dateTo: Date) => void,
  onCancel: () => void,
}

export default function DoubleDateInputModal(props: IDoubleDateInputModalProps) {
  const [value, setValue] = useState(new Date());
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [nextButtonText, setNextButtonText] = useState('Далее');
  const [heading, setHeading] = useState('Начало периода');
  const isDark = useTheme().dark;

  useEffect(() => {
    setDateFrom(undefined);
    setNextButtonText('Далее');
    setHeading('Начало периода');
    setValue(new Date());
  }, [props.visible]);

  const onPressNext = useCallback( () => {
    if (dateFrom === undefined) {
      setDateFrom(value);
      setValue(new Date());
      setNextButtonText('Готово');
      setHeading('Конец периода');
    } else {
      props.onDatesSelected(dateFrom, value);
    }
  }, [dateFrom, value]);

  return (
    <Modal
      visible={props.visible}
      transparent
      animationType="fade"
    >
      <View style={styles.container}>

        <View style={{ backgroundColor: isDark ? MODAL_DARK : 'white', width: '100%', alignItems: 'center',}}>
          <View style={styles.row}>
            <TouchableOpacity onPress={props.onCancel}>
              <ThemedText style={styles.text} >Отмена</ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.text}>
              {heading}
            </ThemedText>

            <TouchableOpacity onPress={onPressNext}>
              <ThemedText style={styles.text}>
                {nextButtonText}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <DatePicker
            textColor={isDark ? 'white' : 'black'}
            mode="date"
            open={true}
            onDateChange={setValue}
            date={value}
            maximumDate={new Date()}
            minimumDate={dateFrom}
            locale="ru"
            cancelText="Отмена"
            confirmText="Применить"
            onCancel={props.onCancel}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  }
});
