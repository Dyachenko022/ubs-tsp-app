import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';
import ThemedText from '../../components/Themed/Text';
import ChipRow from '../../components/ChipRow';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import DoubleDateInputModal from './components/DoubleDateInputModal';
import { addDays, addMonths, addYears, format } from 'date-fns';
import Button from '../../components/Button';
import AccountsSelectInput from '../../components/AccountsSelectInput';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationProps = NativeStackScreenProps<RootStackParamList, 'AccountStatementScreen'>;

interface IAccountStatementScreenProps {
  accounts: Array<IAccountDetails>,
  getStatement: (idAccount: number, dateFrom: Date, dateTo: Date, fileFormat: string) => void,
}

export default function AccountStatementScreen(props: IAccountStatementScreenProps & NavigationProps) {
  const accountIdInProps = props.route?.params?.accountId;

  const [accountId, setAccountId] = useState(accountIdInProps ?? 0);
  const [errorVisible, setErrorVisible] = useState(false);
  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateType, setDateType] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [dateModalShown, setDateModalShown] = useState(false);

  const onDateTypeChange = (newDateType: string) => {
    if (newDateType === 'Задать') {
      setDateModalShown(true);
    } else {
      setDateType(newDateType);
      setDateTo(new Date());
      switch (newDateType) {
        case 'Неделя':
          setDateFrom(addDays(new Date(), -7));
          break;
        case 'Месяц':
          setDateFrom(addMonths(new Date(), -1));
          break;
        case 'Год':
          setDateFrom(addYears(new Date(), -1));
          break;
      }
    }
  };

  const onGetStatementPressed = (() => {
    if (!accountId || !fileFormat || !dateTo) {
      setErrorVisible(true);
      return;
    }
    setErrorVisible(false);
    props.getStatement(accountId, dateFrom, dateTo, fileFormat);
  });

  return (
    <ThemedSafeAreaView modal>
      <ModalScreenHeader onClose={() => props.navigation.pop()} title="Получить выписку" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {!accountIdInProps && (
            <View style={styles.fieldWithPadding}>
              <ThemedText heading2>
                Счет
              </ThemedText>

              <AccountsSelectInput
                accounts={props.accounts}
                value={accountId}
                onSelect={setAccountId}
                errorText="Выберите счет"
                errorTextVisible={errorVisible && !accountId}
              />
            </View>
          )}

          <ThemedText heading2 marginT-16 marginL-8>
            Формат выписки
          </ThemedText>

          <ChipRow
            values={['pdf', '1C']}
            value={fileFormat}
            onValueChange={setFileFormat}
            errorText="Выберите формат файла выписки"
            errorTextVisible={errorVisible && !fileFormat}
          />

          <ThemedText heading2 marginT-16 marginL-8>
            Период
          </ThemedText>

          <ChipRow
            values={['Неделя', 'Месяц', 'Год', 'Задать']}
            value={dateType}
            onValueChange={onDateTypeChange}
            errorText="Выберите период выписки"
            errorTextVisible={errorVisible && !fileFormat}
          />

          {dateType !== '' && (
            <ThemedText small marginL-8>
              {`С ${format(dateFrom, 'dd.MM.yyyy')} по ${format(dateTo, 'dd.MM.yyyy')} `}
            </ThemedText>
          )}

          <DoubleDateInputModal
            visible={dateModalShown}
            onDatesSelected={(dateFrom, dateTo) => {
              setDateFrom(dateFrom);
              setDateTo(dateTo);
              setDateType('Задать');
              setDateModalShown(false);
            }}
            onCancel={ () => setDateModalShown(false)}
          />
        </View>

        <View style={styles.fieldWithPadding}>
          <Button filled label="Получить выписку" onPress={onGetStatementPressed} />
        </View>

      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  fieldWithPadding: {
    paddingHorizontal: 8,
  }
});
