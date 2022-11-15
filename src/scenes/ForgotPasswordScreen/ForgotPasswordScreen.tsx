import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import MaskedInput from '../../components/Themed/MaskedInput';
import ThemedText from '../../components/Themed/Text';

interface IForgotPasswordScreenProps {
  restoreAccess: (phone: string, inn: string) => void,
}

export default function ForgotPasswordScreen(props: IForgotPasswordScreenProps) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [inn, setInn] = useState('');
  const [innError, setInnError] = useState('');
  const phoneRef = useRef<MaskedInput>(null);

  const onEdit = (value: string, handler: React.Dispatch<React.SetStateAction<string>>, handlerError: React.Dispatch<React.SetStateAction<string>>) => {
    handler(value);
    handlerError('');
  };

  const onRestoreAccessPressed = () => {
    let hasErrors = false;
    if (!phone) {
      hasErrors = true;
      setPhoneError('Введите номер телефона');
    }
    if (!inn) {
      hasErrors = true;
      setInnError('Введите ИНН');
    } else if (inn.length !== 10 && inn.length !== 12) {
      hasErrors = true;
      setInnError('ИНН должен состоять из 10 или 12 символов');
    }
    if (hasErrors) return;
    props.restoreAccess(`7${phoneRef.current!.clearMask(phone)}`, inn);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} >

      <View>
        <View style={{ alignItems: 'center'}}>

          <ThemedText subheading marginB-16 style={{textAlign: 'center'}}>
            Для получения пароля заполните все поля
          </ThemedText>
        </View>

        <View style={styles.marginBottom}>
          <MaskedInput
            ref={phoneRef}
            title="Телефон"
            placeholder="+7 (xxx) xxx-xx-xx"
            mask="+7 (000) 000-00-00"
            onChangeText={(v) => onEdit(v, setPhone, setPhoneError)}
            value={phone}
            error={phoneError}
            useTopErrors
          />
        </View>

        <View style={styles.marginBottom}>
          <MaskedInput
            title="ИНН владельца ТСП"
            placeholder=""
            mask="000000000000"
            onChangeText={(v) => onEdit(v, setInn, setInnError)}
            value={inn}
            error={innError}
            useTopErrors
          />
        </View>

      </View>

      <Button
        marginB-32
        label="Восстановить доступ"
        onPress={onRestoreAccessPressed}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 8,
  }, container: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
  }
});
