import React, { useState, useRef } from 'react';

import { SafeAreaView, View, ScrollView, TextInput, Text } from 'react-native';
import Button from '../../components/Button';

import TextField from '../../components/Themed/TextField';

import { useDispatch } from 'react-redux';

import { placeOrder } from '../../redux/orderPlacement/actions';

const CreateSubscriptionScreenTwo = (props: any) => {
  const [subscrPurpose, setSubscrPurpose] = useState<string>('');
  const [payerId, setPayerId] = useState<string>('');

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <View style={{flex: 1, padding: 10, justifyContent: 'space-between'}}>
        <ScrollView bounces={false} 
                    keyboardShouldPersistTaps='handled'>
          <TextField value={subscrPurpose} 
                     title='Назначение подписки'
                     placeholder='Например, оплата кофе'
                     onChangeText={(value) => {
                       setSubscrPurpose(value);
                     }} />
          <TextField value={payerId} 
                     title='Идентификатор плательщика'
                     placeholder='Например, номер телефона'
                     onChangeText={(value) => {
                       setPayerId(value);
                     }} />
        </ScrollView>

        <Button label="Сформировать QR-код" 
                filled 
                disabled={subscrPurpose.length === 0 || payerId.length === 0}
                onPress={() => {
                  dispatch(placeOrder(false, [], 0, 0, 'subscr2', subscrPurpose, payerId));
                }}
                marginH-16 />
      </View>
    </SafeAreaView>
  )  
}

export default CreateSubscriptionScreenTwo;
