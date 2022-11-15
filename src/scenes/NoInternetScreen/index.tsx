import React from 'react';
import ThemedText from '../../components/Themed/Text';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';

export default function NoInternetScreen() {

  return (
    <ThemedSafeAreaView>
      <ThemedText marginT-64 heading style={{textAlign: 'center', width: '100%'}}>
        Соединение с интернетом отсутствует
      </ThemedText>
    </ThemedSafeAreaView>
  );
}
