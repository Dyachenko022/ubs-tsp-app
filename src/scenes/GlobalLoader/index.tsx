import React, { useEffect } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';

export default function GlobalLoader() {

  useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    return () => unsubscribe.remove();
  }, []);

  return (
    <View style={{backgroundColor: 'rgba(128,128,128,0.35)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
