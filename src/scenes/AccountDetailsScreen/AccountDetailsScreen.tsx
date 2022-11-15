import React, { useCallback, useState } from 'react';
import KeyValuePairText from '../../components/Themed/KeyValuePairText';
import BankTheme from '../../bankTheme';
import { SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-ui-lib';
import ThemedText from '../../components/Themed/Text';
import parseMoney from '../../utils/parseMoney';
import { useTheme } from '@react-navigation/native';
import PencilIcon from '../../../assets/pencil.svg';
import StatementIcon from '../../../assets/statement.svg';
import WarningIcon from '../../../assets/warning.png';
import ArrowRight from '../../../assets/arrowRight.svg';
import LinkGroupBox from '../../components/LinkGroupBox';
import ModalTextInput from '../../components/ModalTextInput';
import ViewWithLoading from '../../components/ViewWithLoading';
import { loaderOnRequest } from '../../utils/loadOnRequest';
import { format, parseISO } from 'date-fns';
import { formatAccountNumber } from '../../utils/text';

export default function AccountDetailsScreen(props: IAccountDetailsScreenProps) {
  const { account } = props;
  const isDark = useTheme().dark;
  const [modalInputVisible, setModalInputVisible] = useState(false);
  const subheaderColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(46, 61, 73, 0.6)';

  const changeAccountName = useCallback((text) => {
    void props.setNewAccountName(text);
  }, []);

  const showAccountDetails = useCallback(() => {
    void props.onPressShowAccountDetails();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, padding: 16}}>

        <Text marginB-8 color={subheaderColor}>
          {account.accountName}
        </Text>
        <ThemedText heading>
          {parseMoney(account.balance, 'RUB')}
        </ThemedText>
        <Text color={subheaderColor}>
          {formatAccountNumber(account.numAccount)}
        </Text>

        {account.restrictions.length > 0 && (
          <TouchableOpacity style={styles.warning} onPress={props.onPressRestrictionsDetails}>
            <View style={styles.warningHeader}>
              <Image source={WarningIcon} />
              <Text marginL-8 color="#E82D51" subheading>По счету есть ограничения</Text>
            </View>
            <View style={styles.warningDescContainer}>
              <View style={{flex: 1}}>
                <ThemedText marginV-8>Приостановления на сумму</ThemedText>
                <ThemedText subheading marginV-8>
                  {parseMoney(account.restrictions.reduce((ac, restriction) => ac + restriction.amount,
                    0), 'RUB')}
                </ThemedText>
              </View>
              <View style={{width: 15}}>
                <ArrowRight stroke={BankTheme.colors.link} height={16} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <LinkGroupBox items={[{
          icon: <PencilIcon fill={BankTheme.colors.link} width={16} height={16} />,
          label: 'Переименовать счет',
          onPress: () => setModalInputVisible(true),
        }, {
          label: 'Реквизиты счета',
          onPress: showAccountDetails,
          icon: <StatementIcon fill={BankTheme.colors.link} width={16} height={16} />,
        }, {
          label: 'Получить выписку',
          onPress: props.getStatement,
          icon: <StatementIcon fill={BankTheme.colors.link} width={16} height={16} />,
        }]}
        />

        <KeyValuePairText label="Доступный остаток" value={parseMoney(account.balance, 'RUB')} />
        <KeyValuePairText label="Номер счета" value={formatAccountNumber(account.numAccount)} />
        <KeyValuePairText label="Состояние счета" value={account.state} />
        <KeyValuePairText label="Дата открытия" value={format(parseISO(account.dateOpen), 'dd.MM.yyyy')} />
        <KeyValuePairText label="Валюта счета" value={account.currencyName} />
        <View style={{marginBottom: 32}}/>
      </ScrollView>
      <ModalTextInput
        visible={modalInputVisible}
        onTextEntered={changeAccountName}
        description="Введите название счета"
        defaultValue={props.account.accountName}
        onClose={() => setModalInputVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  warning: {
    backgroundColor: 'rgba(232, 45, 81, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  warningDescContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  }
});
