import React, { useCallback, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import themedGrayColor from '../../utils/themedGrayColor';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import ThemedText from '../../components/Themed/Text';
import { Text } from 'react-native-ui-lib';
import Button from '../../components/Button';
import parseMoney from '../../utils/parseMoney';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import InputPermanentQrCode from './InputPermamentQrCode';
import InputCashLink from './InputCashLink';

export type navigationProps = NativeStackScreenProps<RootStackParamList, 'PermanentQrCodeScreen'>;

export default function PermanentQrCodeScreen(props: IPermanentQrCodeScreenDispatchProps & navigationProps) {
  const grayColor = themedGrayColor();
  const isDark = useTheme().dark;
  const isCashLink = props.route.params.mode === 'cashLink';

  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeSource, setQrCodeSource] = useState<UirFile | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [qrCodeMoney, setQrCodeMoney] = useState<number | undefined>(undefined);

  const onGenerateQrCodePress = useCallback(async () => {
    setIsLoading(true);
    try {
      const qrCodeLinkFromRequest = await props.requestPermanentQrCode(qrCodeMoney ?? 0, description);
      setQrCodeSource(qrCodeLinkFromRequest);
    } finally {
      setIsLoading(false);
    }
  }, [qrCodeMoney, description]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: isDark ? '#222222' : undefined}}>
        <SafeAreaView style={{flex: 1, marginBottom: 12 }}>
          <ModalScreenHeader
            onClose={() => props.navigation.pop()}
            title={isCashLink ? 'Кассовая ссылка' : 'Постоянный QR-код'}
          />

          {isLoading && (
            <ActivityIndicator size="large" style={{top: '45%'}} color="gray" />
          )}

          {!qrCodeSource && !isLoading && (
            <>
              {isCashLink ? (
                <InputCashLink
                  description={description}
                  setDescription={setDescription}
                  onGenerateQrCodePress={onGenerateQrCodePress}
                />
              ) : (
                <InputPermanentQrCode
                  qrCodeMoney={qrCodeMoney}
                  setQrCodeMoney={setQrCodeMoney}
                  description={description}
                  setDescription={setDescription}
                  onGenerateQrCodePress={onGenerateQrCodePress}
                />
              )}
            </>
          )}
          {qrCodeSource && !isLoading && (
            <View style={styles.qrCodeViewAndButton}>
              <View style={styles.qrCodeView}>
                {!isCashLink && (
                  <>
                    <Text color={grayColor}>
                    Общая сумма
                    </Text>
                    <ThemedText heading>
                      {qrCodeMoney ? parseMoney(qrCodeMoney) : 'Не указана'}
                    </ThemedText>
                  </>
                )}

                <Image
                  source={qrCodeSource}
                  style={styles.qrCodeImage}
                />

                <ThemedText style={styles.textQrCodePlacement}>
                Разместите этот QR-код на кассе или в любом удобном месте
                </ThemedText>
              </View>

              <View style={{width: '100%'}}>
                <Button
                  label="Отправить QR-код"
                  filled
                  onPress={() => props.onSendQrCodePress(qrCodeSource)}
                />
              </View>

            </View>
          )}
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCodeImage: {
    width: 295,
    height: 295,
    margin: 16,
    alignSelf: 'center',
  },
  qrCodeView: {
    alignItems: 'center',
  },
  qrCodeViewAndButton: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textQrCodePlacement: {
    marginVertical: 18,
    fontSize: 18,
    textAlign: 'center',
  }
});
