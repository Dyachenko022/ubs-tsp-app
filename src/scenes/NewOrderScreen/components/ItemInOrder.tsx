import React from 'react';
import { StyleSheet, View } from 'react-native';
import SwipeableRow from '../../../components/SwipeableRow';
import Row from '../../../components/ItemInOrder';
import TrashBin from '../../../../assets/trashBin.png';

interface IItemInOrderProps {
  item: IOrderEntry,
  deleteItem: (index: number) => void,
  onChangeCount: (index: number, newCount: number) => void,
  index: number,
}

export default function ItemInOrder(props: IItemInOrderProps) {
  const { item, index } = props;
  return (
    <View style={styles.container}>
      <SwipeableRow
        key={item.itemName + index.toString()}
        rightItems={[{
          label: 'Удалить',
          gradientColors: ['#FC4367', '#EA2047'],
          icon: TrashBin,
          labelColor: 'white',
          onPress: () => props.deleteItem(index),
        }]}
      >
        <Row
          index={index}
          itemName={item.itemName}
          price={item.price}
          count={item.count}
          canChangeCount
          onChangeCount={(newCount) => props.onChangeCount(index, newCount)}
        />
      </SwipeableRow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
});
