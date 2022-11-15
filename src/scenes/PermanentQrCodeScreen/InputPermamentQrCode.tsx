import React from 'react';
import { View } from 'react-native';
import ThemedText from '../../components/Themed/Text';
import MoneyField from '../../components/Themed/MoneyField';
import Button from '../../components/Button';
import ThemedTextField from '../../components/Themed/TextField';

interface IInputPermanentQrCodeProps {
  qrCodeMoney: number | undefined,
  setQrCodeMoney: (value: number | undefined) => void,
  onGenerateQrCodePress: () => void,
  description: string,
  setDescription: (value: string) => void,
}

export default function InputPermanentQrCode(props: IInputPermanentQrCodeProps) {
  return (
    <View>
      <ThemedText heading marginB-32>
        Создать постоянный QR-код
      </ThemedText>

      <ThemedText subheading style={{textAlign: 'center', marginBottom: 32}}>
        Если сумма не указана, при оплате по QR-коду клиенту нужно будет указать сумму в ручную
      </ThemedText>

      <ThemedTextField
        title="Назначение платежа"
        value={props.description}
        onChangeText={props.setDescription}
      />

      <MoneyField
        title="Сумма в QR-коде"
        placeholder="0 ₽"
        value={props.qrCodeMoney}
        onChange={props.setQrCodeMoney}
      />

      <Button
        onPress={props.onGenerateQrCodePress}
        label="Сформировать QR-код"
        filled
      />
    </View>
  );
}
