import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Text } from 'react-native-ui-lib';
import themedGrayColor from '../../utils/themedGrayColor';
import parseMoney from '../../utils/parseMoney';
import ThemedText from '../../components/Themed/Text';
import AccountsList from './components/AccountsList';
import FinanceAnalytics from './components/FinanceAnalytics';
import { useTheme } from '@react-navigation/native';

interface IAccountsSummaryScreen {
  totalSum: number,
  accounts: IAccountDetails[],
}

export default function AccountsSummaryScreen(props: IAccountsSummaryScreen) {
  const isDark = useTheme().dark;
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 16}}>
          <Text marginB-8 color={themedGrayColor()}>
            На ваших счетах
          </Text>
          <ThemedText heading>
            {parseMoney(props.totalSum, 'RUB')}
          </ThemedText>

          <AccountsList accounts={props.accounts} totalSum={props.totalSum} />

        </View>

        <ThemedText heading marginV-8 marginL-16>
          Финансовая аналитика
        </ThemedText>

        <FinanceAnalytics
          darkTheme={isDark}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
