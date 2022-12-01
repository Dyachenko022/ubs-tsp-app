import React, { useEffect } from 'react';
import BankTheme from '../../bankTheme';
import { SafeAreaView, StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Header from '../../components/Header';
import { useTheme } from '@react-navigation/native';
import { NavigationScreenProp } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import ActionCard from './components/ActionCard';
import AccountsList from './components/AccountsList';
import RoundedPlus from '../../../assets/roundedPlus.png';
import InquiryIcon from '../../../assets/inquiry.png';
import Subscription from '../../../assets/subscription.png';
import OperationsSectionList from '../../components/DocumentsSectionList';
import ThemedText from '../../components/Themed/Text';

const width = Dimensions.get('window').width;

export default function MyTspScreen(props: IBankAccountsScreenProps & NavigationScreenProp<'MyTspScreen'>) {
  const isDark = useTheme().dark;
  const gradientColors = isDark ? BankTheme.colors.gradientDark : BankTheme.colors.gradientLight;

  useEffect(() => {
    const timeoutId = setInterval(props.fetchNewMessages , 1000 * 60 * 2);
    return () => clearInterval(timeoutId);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <LinearGradient colors={gradientColors[0]} style={styles.linearGradient} />

      <View style={{zIndex: 3}}>
        <Header
          name={props.name}
          avatarImage={props.avatar}
          countOfUnreadMessages={props.countUnreadMessages}
          onMessagesPress={props.openMessagesScreen}
          onProfilePress={props.openProfileScreen}
          showMessagesIcon
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', margin: 8, marginBottom: 10, justifyContent: 'center'}}>
            {props.regimeAccess !== 'Бухгалтер' && (
              <ActionCard
                image={RoundedPlus}
                onPress={props.openNewOrderScreen}
                label="Новый заказ"
              />
            )}
            <ActionCard
              image={InquiryIcon}
              onPress={props.openHistoryScreen}
              label="История"
            />
            {props.regimeAccess !== 'Бухгалтер' && (
              <ActionCard
                image={Subscription}
                onPress={props.openSubscriptionScreen}
                label="Подписки"
              />
            )}
            {props.regimeAccess !== 'Бухгалтер' && (
              <ActionCard
                image={Subscription}
                onPress={props.openSubscriptionScreenTwo}
                label="Подписки 2"
              />
            )}
          </View>
        </ScrollView>

      </View>
      <View style={{ ...styles.viewR, backgroundColor: isDark ? 'black' : 'white'}}>

        {props.regimeAccess !== 'Кассир' && (
          <AccountsList
            accounts={props.accounts}
            openAccountsSummary={props.openAccountsSummaryScreen}
            requestStatement={props.requestStatement}
            requestInquiry={() => console.warn('OpenInquiry')}
            openAccountDetails={props.openAccountDetails}
          />
        )}
        {props.regimeAccess === 'Кассир' && (
          <View style={{marginTop: 10, flex: 1}}>
            <OperationsSectionList
              loading={false}
              documents={props.documents}
              openReceipt={props.openReceipt}
              openRefund={props.openRefund}
              ListHeaderComponent={
                <ThemedText heading textAlign="center" style={{alignSelf: 'center'}}>
                  Последние операции
                </ThemedText>
              }
            />
          </View> //323752
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '58%',
    zIndex: 3,
  },
  viewR: {
    width,
    zIndex: 4,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    flex: 2,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
