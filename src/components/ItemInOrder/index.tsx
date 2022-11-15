import { StyleSheet, View } from 'react-native';
import ThemedText from '../Themed/Text';
import { Text } from 'react-native-ui-lib';
import parseMoney from '../../utils/parseMoney';
import Stepper from '../Themed/Stepper';
import React from 'react';
import themedGrayColor from '../../utils/themedGrayColor';


interface IItemInOrderProps {
  index: number,
  itemName: string,
  price: number,
  count: number,
  canChangeCount? :boolean,
  onChangeCount?: (newCount: number) => void,
}

export default function ItemInOrder(props: IItemInOrderProps) {
  const grayColor = themedGrayColor();
  const { index, itemName, price, count } = props;
  return (
    <View style={styles.container}>
      <View style={styles.nameAndCount}>
        <ThemedText style={{flex: 2}} heading2>
          {`${index + 1}. ${itemName}`}
        </ThemedText>
        <Text color={grayColor}>
          {`${count} x ${parseMoney(price)}`}
        </Text>
      </View>
      <View style={props.canChangeCount && props.onChangeCount ? styles.stepperAndPrice : styles.onlyPrice}>
        {props.canChangeCount && props.onChangeCount && (
          <Stepper value={count} minValue={1} onChangeValue={props.onChangeCount} />
        )}
        <ThemedText heading2>
          {parseMoney(price * count)}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16
  },
  nameAndCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  stepperAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlyPrice: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});
