import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import MoneyField from '../../components/Themed/MoneyField';
import Button from '../../components/Button';
import ThemedTextField from '../../components/Themed/TextField';
import { refund } from '../../redux/history/actions';
import { RootStackParamList } from '../../rootStackParamList';
import { AppDispatch } from '../../redux/store';

type IRefundScreenProps  = {
  navigation: StackNavigationProp<RootStackParamList, 'RefundScreen'>,
} & NativeStackScreenProps<RootStackParamList, 'RefundScreen'>;

export default function RefundScreen(props: IRefundScreenProps) {

  const [amount ,setAmount] = useState<number | undefined>(undefined);
  const [note, setNote] = useState('');
  const [errorAmount, setErrorAmount] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const onRefundPressed = (async () => {
    if (!amount) {
      setErrorAmount('Необходимо ввести сумму возврата');
      return;
    }
    await dispatch(refund(props.route.params.id, amount, note));
    props.navigation.pop();
  });

  const onChangeAmount = useCallback((newAmount) => {
    setAmount(newAmount);
    setErrorAmount('');
  }, []);

  return (
    <ThemedSafeAreaView>
      <ModalScreenHeader title="Возврат средств" onClose={() => props.navigation.pop()} />
      <View style={styles.spaceBetween}>
        <View>
          <MoneyField
            value={amount}
            maxValue={props.route.params.maxAmount}
            onChange={onChangeAmount}
            title="Сумма возврата"
            placeholder="Введите сумму"
            useTopErrors
            error={errorAmount}
            containerStyle={styles.marginBottom}
          />

          <ThemedTextField
            value={note}
            onChangeText={setNote}
            title="Причина возврата"
          />
        </View>

        <Button
          filled
          label="Вернуть средства"
          onPress={onRefundPressed}
        />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  spaceBetween: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 16,
  }
});
