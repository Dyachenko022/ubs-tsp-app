import React from 'react';
import { FlatList, Image, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import ThemedText from '../../../components/Themed/Text';
import parseMoney from '../../../utils/parseMoney';
import WaningIcon from '../../../../assets/warning.png';
import LinkGroupBox from '../../../components/LinkGroupBox';
import themedGrayColor from '../../../utils/themedGrayColor';
import BankTheme from '../../../bankTheme';
import StatementIcon from '../../../../assets/statement.svg';
import InformationIcon from '../../../../assets/information.svg';
import { formatAccountNumber } from '../../../utils/text';
import { useTheme } from '@react-navigation/native';

interface IAccountsList {
  accounts: IAccountDetails[],
  openAccountDetails: (account: IAccountDetails) => void,
  openAccountsSummary: () => void,
  requestStatement: () => void,
  requestInquiry: () => void,
}

export default function AccountsList(props: IAccountsList) {
  const grayColor = themedGrayColor();
  const isDark = useTheme().dark;
  let totalSum = 0;
  let hasRestrictions = false;
  props.accounts.forEach((account) => {
    totalSum += account.balance;
    hasRestrictions = hasRestrictions || account.restrictions.length > 0;
  });

  const renderAccountItem = (info: ListRenderItemInfo<IAccountDetails>) => {
    const { item } = info;
    const hasRestrictions = item.restrictions.length > 0;
    let backgroundColor = 'transparent';
    if (hasRestrictions) {
      if (isDark) {
        backgroundColor = '#8b0000';
      } else {
        backgroundColor = '#FAD5DC';
      }
    }
    return (
      <TouchableOpacity onPress={() => props.openAccountDetails(item)}
        style={{flexDirection: 'row', paddingVertical: 8, backgroundColor}}
      >
        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#6CC49A', margin: 8, alignItems: 'center', justifyContent: 'center'}}>
          <Text color="white" subheading>
            ₽
          </Text>
        </View>
        <View>
          <Text body color={grayColor}>
            {item.accountName}
          </Text>
          <ThemedText subheading marginV-8>
            {parseMoney(item.balance)}
          </ThemedText>
          <Text body color={grayColor}>
            {formatAccountNumber(item.numAccount)}
          </Text>
          {hasRestrictions && (
            <Text body color="red">По счету есть ограничения</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = (
    <View style={{padding: 16}}>
      <Text small marginB-4 color={grayColor}>
        На ваших счетах
      </Text>

      <ThemedText heading marginB-4>
        {parseMoney(totalSum)}
      </ThemedText>

      {hasRestrictions && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={WaningIcon} style={{height: 16, width: 16}} />
          <Text marginL-5 color={grayColor}>По счетам имеются ограничения</Text>
        </View>
      )}

      <LinkGroupBox items={[
        {
          onPress: props.openAccountsSummary,
          label: 'Подробнее о счетах',
          icon: <InformationIcon fill={BankTheme.colors.link} width={16} height={16} />,
        }, {
          onPress: props.requestStatement,
          label: 'Получить выписку',
          icon: <StatementIcon fill={BankTheme.colors.link} width={16} height={16} />,
        }
      ]}
      />

      <Text color={grayColor} marginT-16 heading2>
        Мои счета
      </Text>
    </View>
  );

  return (
    <View>
      <FlatList
        nestedScrollEnabled
        style={{height: '100%'}}
        data={props.accounts}
        renderItem={renderAccountItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
}
