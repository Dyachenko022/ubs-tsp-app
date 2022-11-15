import React from 'react';
import { Linking, TouchableOpacity, View, Image, StyleSheet, ScrollView } from 'react-native';
import KeyValuePairText from '../../components/Themed/KeyValuePairText';
import ThemedText from '../../components/Themed/Text';
import Link from '../../components/Link';
import BankTheme from '../../bankTheme';
import CrossIcon from '../../../assets/cross.svg';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../rootStackParamList';

type OwnProps = NativeStackScreenProps<RootStackParamList, 'RestrictionsDetailsScreen'>;

export default function RestrictionsDetailsScreen(props: OwnProps) {
  const isDark = useTheme().dark;
  const backgroundColorActions = isDark ? 'rgba(46,  61, 74, 0.6)' : '#F1F1F1';

  const restrictions = props.route.params.restrictions;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, marginBottom: 32}}>
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => props.navigation.pop()}>
            <CrossIcon stroke={BankTheme.colors.link} width={24} height={24} />
          </TouchableOpacity>
        </View>

        <ThemedText heading marginV-16>
          Налоговая наложила ограничения на счет
        </ThemedText>

        {restrictions.map((restrictionDetail) => (
          <View key={restrictionDetail.numDecision} style={{borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 48}}>
            <KeyValuePairText label="Дата установки" value={restrictionDetail.dateSet} />
            <KeyValuePairText label="Описание" value={restrictionDetail.description} />
            <KeyValuePairText label="Дата решения" value={restrictionDetail.dateDecision} />
            <KeyValuePairText label="Номер постановления" value={restrictionDetail.numDecision} />
          </View>
        ))}
        <Link
          label="Обратиться в банк"
          onPress={() => Linking.openURL('tel:+79031024020')}
          icon={() => <Image source={BankTheme.images.loginPageCallIcon} style={{width: 16, height:16}}/>}
          containerStyle={{...styles.linkContainer, backgroundColor: backgroundColorActions}}
          textStyle={styles.linkText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linkText: {
    fontSize: 21,
    color: BankTheme.colors.link,
  },
  linkContainer: {
    borderRadius: 12, padding: 16, marginTop: 33
  },
});
