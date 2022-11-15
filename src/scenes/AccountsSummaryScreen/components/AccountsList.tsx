import React from 'react';
import themedGrayColor from '../../../utils/themedGrayColor';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-ui-lib';
import ThemedText from '../../../components/Themed/Text';
import parseMoney from '../../../utils/parseMoney';
import WaningIcon from '../../../../assets/warning.png';
import { formatAccountNumber } from '../../../utils/text';

interface IAccountsList {
  accounts: IAccountDetails[],
  totalSum: number,
}

const barColors = ['#FDB620', '#7D7FBC', '#65C4FF', 'yellow', '#FA0EE0'
  ,'#00A0A0', '#AAFA00'];
const HEIGHT = 18;
const screenWidth = Dimensions.get('screen').width - 32;

export default function AccountsList(props: IAccountsList) {

  const widths = props.accounts.map((account) => screenWidth / 100.0 * (account.balance / props.totalSum * 100));
  const grayColor = themedGrayColor();

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {widths.map((_width, index) => {
          const marginLeft = index === 0 ? 0 : -15;
          const width = index === 0 ? _width : _width + 15;
          const borderRadius = index === 0 ? 15 : 0;
          return (
            <View key={index} style={{ ...styles.accountBar, width, marginLeft, backgroundColor:  barColors[index % barColors.length],
              borderRadius, zIndex: 10 - index,}}
            />
          );
        })}
      </View>

      <View style={styles.accountsList}>
        {props.accounts.map((account, index) => (
          <View key={account.id} style={styles.accountContainer}>
            <View style={{ ...styles.accountDot, backgroundColor: barColors[index % barColors.length] }} />

            <View style={{marginLeft: 8, marginBottom: 24, flex: 1}}>
              <View style={styles.accountNameAndSum}>
                <Text marginB-8 marginR-4 color={grayColor} style={styles.accountName}>
                  {account.accountName}
                </Text>
                <ThemedText subheading>
                  {parseMoney(account.balance, account.currency)}
                </ThemedText>
              </View>

              <ThemedText marginB-8 marginR-4>
                {formatAccountNumber(account.numAccount)}
              </ThemedText>

              {account.restrictions.length > 0 && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={WaningIcon} style={{height: 16, width: 16}} />
                  <Text marginL-5 color={grayColor}>По счетам имеются ограничения</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', marginTop: 24,
  },
  accountsList: {
    width: '100%', marginTop: 24,
  },
  barContainer: {
    width: '100%', height: HEIGHT, flexDirection: 'row', borderRadius: 15,
  },
  accountBar: {
    borderTopRightRadius: 15, borderBottomRightRadius: 15, height: HEIGHT,
  },
  accountContainer: {
    flexDirection: 'row', width: '100%',
  },
  accountDot: {
    width: 18, height: 18, borderRadius: 9,
  },
  accountNameAndSum: {
    flexDirection: 'row', width: '100%', justifyContent: 'space-between',
  },
  accountName: {
    flex: 3, maxWidth: '50%',
  },
});
