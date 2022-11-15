import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BankTheme from '../../bankTheme';
import AddIcon from '../../../assets/add.svg';
import SubscriptionInfo  from './Components/SubscriptionInfo';
import ThemedText from '../../components/Themed/Text';
import SearchTextInput from './Components/SearchTextInput';
import SubscriptionsSectionList from '../../components/SubscriptionsSectionList';
import { useTheme } from '@react-navigation/native';
import { deleteSubscription } from '../../redux/subscription/api';
import ModalTextInput from '../../components/ModalTextInput';

export default function SubscriptionScreen(props: ISubscriptionScreenStateProps & ISubscriptionScreenDispatchProps) {
  const subscriptionInfoRef = useRef<SubscriptionInfo>(null);
  const isDark = useTheme().dark;
  const [numPage, setNumPage] = useState(1);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>

        <View style={styles.header}>
          <SearchTextInput getSubscriptions={props.getSubscriptionsWithSearch} />

          <TouchableOpacity onPress={props.openCreateSubscriptionScreen}>
            <AddIcon stroke={BankTheme.colors.link} fill={BankTheme.colors.link} width={32} height={32} />
          </TouchableOpacity>
        </View>

        <SubscriptionsSectionList
          subscriptions={props.subscriptions}
          loading={props.loading}
          regimeAccess={props.regimeAccess}
          onRefresh={() => props.getSubscriptions(1)}
          onEndReached={() => {
            if (!props.loading && props.countSubscriptions > props.subscriptions.length) {
              props.getSubscriptions(numPage + 1);
              setNumPage(numPage + 1);
            }
          }}
          deleteSubscription={(id:number) => props.deleteSubscription(id)}
          ListFooterComponent={() => {
            if (props.countSubscriptions >= props.subscriptions.length && props.subscriptions.length > 0) return (
              <View style={{width: '100%', alignItems: 'center', marginVertical: 16}}>
                <ThemedText subheading>Больше подписок нет</ThemedText>
              </View>
            );
            else return null;
          }}
          ListEmptyComponent={
            <View style={{width: '100%', alignItems: 'center', marginVertical: 16}}>
              <ThemedText subheading>Подписок пока нет</ThemedText>
            </View>
          }
        />
      </SafeAreaView>

      <SubscriptionInfo
        ref={subscriptionInfoRef}
        isDark={isDark}
        regimeAccess={props.regimeAccess}
      />
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  }, buttonGradient: {
    width: 93,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, rowTouchable: {
    width: '100%',
    marginTop: 8,
  }, section: {
    width: '100%',
    backgroundColor: 'white'
  }
});
