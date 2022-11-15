import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import BankTheme from '../../bankTheme';
import ThemedText from '../../components/Themed/Text';
import AutosizeImage from '../../components/AutosizeImage';

export default function LoadingScreen(props: unknown) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <AutosizeImage maxHeight={60} source={BankTheme.images.loginPageLogo} containerStyle={styles.logo} />

          <ThemedText subheading>
            Секундочку,
          </ThemedText>
          <ThemedText subheading>
            Загружаем приложение
          </ThemedText>
        </View>

        <ActivityIndicator size="large" style={{marginBottom: 32}} color="gray" />
      </View>

      <View style={{position: 'absolute', bottom: 0, width: '100%', height: '50%'}}>
        <Image source={BankTheme.images.loadingPageImage} style={{width: '100%', height: '100%'}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 24,
  },
  container: {
    paddingTop: 50, paddingHorizontal: 16, height: '50%', justifyContent: 'space-between',
  }
});
