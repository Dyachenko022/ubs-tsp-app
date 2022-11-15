import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ThemedText from '../Themed/Text';
import SbpLogo from '../../../assets/sbpLogo.png';
import { useTheme } from '@react-navigation/native';

export default function SbpLogoFooter(props: unknown) {
  const isDark = useTheme().dark;
  return (
    <View style={{...styles.sbpLogoSafeArea, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#F1F1F1'}}>
      <View style={styles.sbpLogoContainer}>
        <ThemedText>
          Система быстрых платежей
        </ThemedText>
        <Image source={SbpLogo} style={{width: 64, height: 32}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sbpLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  sbpLogoSafeArea: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%'
  },
});
