import React from 'react';
import { Switch } from 'react-native-ui-lib';
import {  ScrollView, StyleSheet, View } from 'react-native';
import ThemedText from '../../components/Themed/Text';
import ChipRow from '../../components/ChipRow';
import BorderedLink from '../../components/Themed/BorderedLink';

export default function SettingsScreen(props: ISettingsScreenProps) {
  const { settings } = props;

  return (
    <ScrollView>
      <View style={{padding: 16}}>
        <View style={{marginBottom: 8}}>
          <BorderedLink
            onPress={props.openChangePasswordScreen}
            label="Сменить пароль"
          />

          {(props.regimeAccess === 'Администратор') && (
            <BorderedLink
              onPress={props.openPermanentQrCodeScreen}
              label="Создать постоянный QR-код"
              containerStyle={{marginTop: 16}}
            />
          )}

          {(props.regimeAccess === 'Администратор') && (
            <BorderedLink
              onPress={props.openCreateCashLink}
              label="Регистрация кассовой ссылки"
              containerStyle={{marginTop: 16}}
            />
          )}
        </View>

        <ThemedText heading2 marginV-16>
          Настройка темы
        </ThemedText>

        <View style={styles.row}>
          <ThemedText body>
            Автоматически
          </ThemedText>

          <Switch
            width={51}
            height={30}
            thumbSize={23}
            onColor="#34C759"
            offColor="#E5E5EA"
            value={settings.useAutoTheme}
            onValueChange={(v) => props.setTheme(v ? 'auto' : 'light')}
          />
        </View>

        <ThemedText small marginB-16>
          Тема приложения меняется в зависимости от настроек смартфона
        </ThemedText>

        <View style={styles.row}>
          <ThemedText body>
            Темная тема
          </ThemedText>

          <Switch
            width={51}
            height={30}
            thumbSize={23}
            onColor="#34C759"
            offColor="#E5E5EA"
            disabled={settings.useAutoTheme}
            value={settings.useDarkTheme} onValueChange={(v) => props.setTheme(v? 'dark' : 'light')}
          />
        </View>

        <ThemedText small>
          Всегда использовать темную тему для приложения
        </ThemedText>

        <ThemedText heading2 marginT-32 marginB-8>
          Настройка НДС
        </ThemedText>

        <ChipRow
          values={props.ndsList.map((nds) => `${nds} %`)}
          value={`${props.nds} %`}
          onValueChange={props.setNds}
        />

        <ThemedText small>
          Ставка, указанная при оплате заказа
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
