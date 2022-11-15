import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MinusIcon from '../../../../assets/minus.svg';
import PlusIcon from '../../../../assets/plus.svg';
import ThemedTextField from '../TextField';
import { useTheme } from '@react-navigation/native';

interface IStepperProps {
  value: number,
  onChangeValue: (newValue: number) => void,
  minValue?: number
}

export default function Stepper(props: IStepperProps & typeof Stepper.defaultProps) {
  const isDark = useTheme().dark;
  const backgroundColor = isDark ? '#515494' : '#BFC0DC';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{...styles.button, backgroundColor, marginRight: 16}}
        onPress={() => {
          if (props.value -1 >= props.minValue) props.onChangeValue(props.value - 1);
        }}
      >
        <MinusIcon width={32} height={32} />
      </TouchableOpacity>

      <ThemedTextField
        centered={true}
        value={props.value.toString()}
        keyboardType="numeric"
        maxLength={3}
        useTopErrors
        style={{width: 30, textAlign: 'center'}}
      />

      <TouchableOpacity
        style={{...styles.button, backgroundColor, marginLeft: 16}}
        onPress={() => props.onChangeValue(props.value + 1)}
      >
        <PlusIcon width={32} height={32} stroke="white" />
      </TouchableOpacity>

    </View>
  );
}

Stepper.defaultProps = {
  minValue: 0,
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 6,
  }
});
