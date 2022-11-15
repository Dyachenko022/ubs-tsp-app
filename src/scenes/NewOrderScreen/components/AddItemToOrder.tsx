import React, { useState } from 'react';
import { Text } from 'react-native-ui-lib';
import TextField from '../../../components/Themed/TextField';
import { Keyboard, View } from 'react-native';
import Stepper from '../../../components/Themed/Stepper';
import Button from '../../../components/Button';
import MoneyField from '../../../components/Themed/MoneyField';

interface IAddItemToOrderProps {
  onAddItem: (item: IOrderEntry) => void,
}

export default function AddItemToOrder(props: IAddItemToOrderProps) {
  const [name ,setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [price ,setPrice] = useState<number | undefined>(undefined);
  const [priceError, setPriceError] = useState('');
  const [count ,setCount] = useState(1);

  const onAddButtonPressed = () => {
    Keyboard.dismiss();
    if (!name) {
      setNameError('Не указано название товара');
    }
    if (!price) {
      setPriceError('Не указана цена');
    }
    if (count > 0 && name && (price ?? 0) > 0) {
      props.onAddItem({
        itemName: name,
        count,
        price: (price as number),
      });
      setName('');
      setPrice(undefined);
      setCount(1);
    }
  };

  return (
    <View style={{marginHorizontal: 16}}>
      <Text heading2  marginB-16 color="#B2B9C6">Добавить товар в заказ</Text>

      <TextField
        containerStyle={{marginBottom: 18}}
        title="Наименование товара"
        placeholder="Например, кофе"
        value={name}
        onChangeText={(t) => {
          setName(t);
          setNameError('');
        }}
        error={nameError}
        useTopErrors
      />

      <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8}}>
        <MoneyField
          containerStyle={{flex: 1, maxWidth: 170}}
          title="Цена за 1 штуку"
          placeholder="0 ₽"
          error={priceError}
          useTopErrors
          value={price}
          onChange={(v) => {
            setPrice(v);
            setPriceError('');
          }}
        />

        <Stepper value={count} onChangeValue={setCount} minValue={1} />

      </View>

      <Button label="Добавить в заказ" onPress={onAddButtonPressed}/>
    </View>
  );
}
