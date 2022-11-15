import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ScrollView, Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native-ui-lib';
import ThemedText from '../../components/Themed/Text';
import Button from '../../components/Button';
import parseMoney from '../../utils/parseMoney';
import themedGrayColor from '../../utils/themedGrayColor';
import { RootStackParamList } from '../../rootStackParamList';
import Link from '../../components/Link';
import TextField from '../../components/Themed/TextField';

export type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'SubscriptionCreateScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};

const screenHeight = Dimensions.get('window').height - 50;

export default function NewOrderScreen(props: ISubscriptionCreateScreenStateProps & ISubscriptionCreateScreenDispatchProps & OwnProps) {
  const grayColor = themedGrayColor();
  const backgroundColor = useTheme().dark ? 'black' : 'white';

  const [isLoading, setIsLoading] = useState(false);
  const [purpose ,setPurpose] = useState('');
  const [payerId ,setPayerId] = useState('');
  const [nameError, setNameError] = useState('');
  const [qrCodeSource] = useState<UirFile | undefined>(undefined);

  const onMakeQrCodeSubscr = useCallback(async () => {
    setIsLoading(true);
    try {
      await props.makeSubscrQrCode(purpose, payerId);
    } finally {
      setIsLoading(false);

      
    }
  }, [purpose, payerId]);


  return (
    <SafeAreaView style={{height: screenHeight}}>

      <ScrollView
        style={{backgroundColor, minWidth: 200,}}
        contentContainerStyle={{ zIndex: 4, padding: 0,}}
        keyboardShouldPersistTaps="handled"
      >
        {!qrCodeSource && !isLoading && (
          <View style={styles.spaceBetweenAndPadding}>
            <TextField
              containerStyle={{marginBottom: 18}}
              title="Назначение подписки"
              placeholder="Например, оплата кофе"
              value={purpose}
              onChangeText={(t) => {
                setPurpose(t);
                setNameError('');
              }}
              error={nameError}
              useTopErrors
            />
            <TextField
              containerStyle={{marginBottom: 18}}
              title="Идентификатор плательщика"
              placeholder="Например, номер телефона"
              value={payerId}
              onChangeText={(t) => {
                setPayerId(t);
                setNameError('');
              }}
              error={nameError}
              useTopErrors
            />
          </View>
        )}

        <View style={{height: 115, width: '100%'}} />

      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button label="Сформировать QR-код" filled marginH-16 onPress={onMakeQrCodeSubscr} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  spaceBetweenAndPadding: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  qrCodeButtonContainer: {
    padding: 16,
    width: '100%',
    flex: 0,
  },
  linkContainer: {
    width: '100%', justifyContent: 'center', marginBottom: 10,
  },
  linkText: {
    fontSize: 18, fontWeight: '700',
  },
  buttonContainer: {
    padding: 16,
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
