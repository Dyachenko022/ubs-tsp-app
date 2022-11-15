import React from 'react';
import { View } from 'react-native';
import ThemedText from '../../components/Themed/Text';
import Button from '../../components/Button';
import ThemedTextField from '../../components/Themed/TextField';

interface IInputCashLinkProps {
  description: string,
  setDescription: (value: string) => void,
  onGenerateQrCodePress: () => void,
}

export default function InputCashLink(props: IInputCashLinkProps) {

  return (
    <View>
      <ThemedText heading marginB-32>
        Регистрация кассовой ссылки
      </ThemedText>

      <ThemedText subheading style={{textAlign: 'center', marginBottom: 32}}>
        Укажите назначение платежа для кассовой ссылки
      </ThemedText>

      <ThemedTextField
        title="Назначение платежа"
        value={props.description}
        onChangeText={props.setDescription}
      />

      <Button
        onPress={props.onGenerateQrCodePress}
        label="Сформировать QR-код"
        filled
      />
    </View>
  );
}
