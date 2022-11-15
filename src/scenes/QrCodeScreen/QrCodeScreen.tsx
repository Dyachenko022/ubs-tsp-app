import React, { useMemo } from 'react';
import { ActivityIndicator, Image, View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import ThemedText from '../../components/Themed/Text';
import parseMoney from '../../utils/parseMoney';
import themedGrayColor from '../../utils/themedGrayColor';
import SuccessIcon from '../../../assets/success.png';
import FailureIcon from '../../../assets/fail.png';
import { useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import { MODAL_DARK } from '../../utils/K';
import Button from '../../components/Button';
import SbpLogoFooter from '../../components/SbpLogoFooter';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'QrCodeScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};

export default function QrCodeScreen(props: IQrCodeScreenStateProps & IQrCodeScreenDispatchProps & OwnProps) {
  const grayColor = themedGrayColor();
  const isDark = useTheme().dark;
  // Сумма сбросится при успешной оплате. Для того, чтобы она осталась на форме, сохраняем ее
  const totalSum = useMemo(() => props.totalSum, []);

  let statusComponent = Loading;

  if (props.qrCodeStatus === 'success') {
    statusComponent = Success;
  } else if (props.qrCodeStatus === 'successPay') {
    statusComponent = SuccessPayAndWaitSubscr;
  } else if (props.qrCodeStatus === 'successPayAndSubscr') {
    statusComponent = SuccessPayAndSubscr;
  } else if (props.qrCodeStatus === 'failure') {
    statusComponent = Failure(props.qrCodeFailureText, props.mode);
  } else if (props.qrCodeStatus === 'failureSubscr') {
    statusComponent = FailureSubscr(props.qrCodeFailureText, props.mode);
  }

  let title = 'Покажите QR-код покупателю';
  if(props.mode == 'cashLink')
    title = 'Оплата по кассовой ссылке'
  else if(props.mode == 'subscrLink')
    title = 'Покажите QR-код клиенту'
  else if (props.mode == 'payWithSubscr')
    title = 'Дождитесь завершения оплаты'
  
  const textForPayer = props.mode == 'payWithSubscr' 
                        ? 'Выполняется оплата по подписке' 
                        : 'Предложите покупателю отсканировать QR-код, размещенный на кассе';

  return (
    <View style={{flex: 1, backgroundColor: isDark ? MODAL_DARK : 'white'}}>
      <ModalScreenHeader
        hideCloseButton
        title={title}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View>
          {props.mode != 'subscrLink' && <View style={styles.totalSum}>
            <Text color={grayColor}>
              Общая сумма
            </Text>
            <ThemedText heading>
              {parseMoney(totalSum)}
            </ThemedText>
          </View>}

          {props.mode == 'cashLink' || props.mode == 'payWithSubscr' ? (
            <View style={styles.qrCashLink}>
              <ThemedText subheading marginT-64 style={{textAlign: 'center'}}>
              {textForPayer}
              </ThemedText>
            </View>
          ) : (
            <Image
              source={{uri: `data:image/png;base64,${props.qrCodeBase64}`}}
              style={styles.qrCodeImage}
            />
          )}

          <View style={styles.statusComponentContainer}>
            {statusComponent(props.mode)}
          </View>

          <Button
            label={props.qrCodeStatus === 'pending' && props.mode != 'subscrLink' ? 'Отменить оплату': 'Завершить'}
            onPress={() => props.onClose(props.mode)}
          />
        </View>

        <View style={{marginTop: 32}}>
          <Text color={grayColor} marginB-16>
            {props.tspName}
          </Text>
          <Text color={grayColor} marginB-16>
            {props.tspAddress}
          </Text>
        </View>
      </ScrollView>

      <SbpLogoFooter />
    </View>
  );
}

const Loading = (mode: string) => (
  <>
    <ActivityIndicator size="large" color="#999999" />
    {(<Text marginV-8 heading2 color="#B2B9C6">
        {mode === 'subscrLink' ? 'Подтверждение подписки' : 'Ожидание оплаты'}
      </Text>)
    }
  </>
);

const Success = (mode: string) => (
  <>
    <Image source={SuccessIcon} style={styles.image} />
    <Text marginV-8 heading2 color="#4ECFA8">
    {mode == 'subscrLink' ? 'Подписка подтверждена' : 'Оплата завершена'}
    </Text>
  </>
);

const SuccessPayAndWaitSubscr = (mode: string) => (
  <>
    <View style={styles.successAndWait}>
      <Image source={SuccessIcon} style={styles.image} />
      <Text marginV-8 heading2 color="#4ECFA8">
        Оплата завершена
      </Text>
    </View>
    <View style={styles.successAndWait}>
      <ActivityIndicator size="large" color="#999999" />
      {<Text marginV-8 heading2 color="#B2B9C6">
        Ожидание подписки
      </Text>}
    </View>
  </>
);

const SuccessPayAndSubscr = (mode: string) => (
  <>
    <View style={styles.successAndWait}>
      <Image source={SuccessIcon} style={styles.image} />
      <Text marginV-8 heading2 color="#4ECFA8">
        Оплата завершена
      </Text>
    </View>
    <View style={styles.successAndWait}>
      <Image source={SuccessIcon} style={styles.image} />
      {<Text marginV-8 heading2 color="#4ECFA8">
        Подписка подтверждена
      </Text>}
    </View>
  </>
);

// eslint-disable-next-line react/display-name
const Failure = (failureText: string, mode:string) => () => (
  <>
    <Image source={FailureIcon} style={styles.image} />
    <Text marginT-8 heading2 color="#E82D51">
    {mode === 'subscrLink' ? 'Подписка не подтверждена' : 'Ошибка оплаты'}
    </Text>
    {mode != 'subscrLink' && (<Text marginB-8 subheading color="#E82D51" style={styles.failureText} >
      {failureText}
    </Text>)}
  </>
);

const FailureSubscr = (failureText: string, mode:string) => () => (
  <>
    <View style={styles.successAndWait}>
      <Image source={SuccessIcon} style={styles.image} />
      <Text marginV-8 heading2 color="#4ECFA8">
        Оплата завершена
      </Text>
    </View>
    
    <View style={styles.successAndWait}>
      <Image source={FailureIcon} style={styles.image} />
      <Text marginT-8 heading2 color="#E82D51">
        Подписка не подтверждена
      </Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    marginRight: 6,
  },
  totalSum: {
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    minHeight: 610,
    justifyContent: 'space-between'
  },
  qrCodeImage: {
    width: 295,
    height: 295,
    margin: 16,
    alignSelf: 'center',
  },
  qrCashLink: {
    height: 295,
    margin: 8,
    alignSelf: 'center',
  },
  statusComponentContainer: {
    width: '100%', alignItems: 'center', marginTop: 16, height: 100,
  },
  failureText: {
    width: '100%',
    textAlign: 'center',
  },
  successAndWait: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
