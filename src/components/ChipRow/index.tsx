import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Chip from '../Chip';
import { Text } from 'react-native-ui-lib';

interface IChipRowProps<T extends string> {
  values: T[],
  value: T | undefined,
  onValueChange: (newValue: T) => void,
  allowClear?: boolean,
  onClear?: () => void,
  errorText?: string,
  errorTextVisible?: boolean;
}

export default function ChipRow<T extends string>(props: IChipRowProps<T>) {
  const { values, value, allowClear } = props;

  const onValuePressed = (item: T) => {
    if (allowClear && props.onClear && item === value) {
      props.onClear();
    } else {
      props.onValueChange(item);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      >
        {values.map(item => (
          <Chip
            key={String(item)}
            label={String(item)}
            active={item === value}
            onPress={() => onValuePressed(item)}
          />
        ))}
      </ScrollView>
      <View style={{height: 15}}>
        {props.errorTextVisible && (
          <Text color="red" small marginL-8>
            {props.errorText}
          </Text>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
});
