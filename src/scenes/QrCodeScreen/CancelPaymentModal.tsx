import React, { useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import ThemedText from '../../components/Themed/Text';
import SbpLogoFooter from '../../components/SbpLogoFooter';
import SuccessIcon from '../../../assets/success.png';
import FailureIcon from '../../../assets/fail.png';
import PendingIcon from '../../../assets/pending.png';
import themedGrayColor from '../../utils/themedGrayColor';
import parseMoney from '../../utils/parseMoney';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../rootStackParamList';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';

type OwnProps = NativeStackScreenProps<RootStackParamList, 'CancelPaymentModal'>;

export default function CancelPaymentModal(props: OwnProps) {
  const grayColor = themedGrayColor();

  const {
    state,
    noteState,
    message,
    tspName,
    tspAddress,
    totalSum,
  } = props.route.params;

  let icon = FailureIcon;
  let statusColor = '#E82D51';
  if (state === 0) {
    icon = SuccessIcon;
    statusColor = '#4ECFA8';
  } else if (state === 1) {
    icon = PendingIcon;
    statusColor = '#FDB620';
  }

  const onClose = useCallback(() => {
    props.navigation.pop(2);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ModalScreenHeader title="Отмена оплаты" onClose={onClose}/>
      <View style={styles.container}>
        <View style={styles.topPart}>
          <View style={styles.totalSum}>
            <Text color={grayColor}>
              Общая сумма
            </Text>
            <ThemedText heading>
              {parseMoney(totalSum)}
            </ThemedText>
          </View>

          <Image source={icon} style={styles.image} />
          <Text color={statusColor} marginT-16 heading style={{ textAlign: 'center'}}>
            {noteState}
          </Text>

          {message !== '' && (
            <ThemedText color={statusColor} marginT-8 subheading style={{ textAlign: 'center'}}>
              {message}
            </ThemedText>
          )}

        </View>
        <View>
          <View style={{marginTop: 32, paddingHorizontal: 16,}}>
            <Text color={grayColor} marginB-16>
              {tspName}
            </Text>
            <Text color={grayColor} marginB-16>
              {tspAddress}
            </Text>
          </View>
          <SbpLogoFooter />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  totalSum: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 32,
  },
  image: {
    width: 64,
    height: 64,
  },
  topPart: {
    alignItems: 'center',
    paddingHorizontal: 16
  }
});
