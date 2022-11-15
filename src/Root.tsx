import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import BankTheme from './bankTheme';
import { Colors } from 'react-native-ui-lib/core';
import AuthScreen from './scenes/AuthScreen';
import AboutScreen from './scenes/AboutScreen';
import MapScreen from './scenes/MapScreen';
import SelectTspScreen from './scenes/SelectTspScreen';
import NewOrderScreen from './scenes/NewOrderScreen';
import HistoryScreen from './scenes/HistoryScreen';
import AccountDetailsScreen from './scenes/AccountDetailsScreen';
import { RootStackParamList } from './rootStackParamList';
import PasswordEnterScreen from './scenes/PasswordEnterScreen';
import CodeEnterScreen from './scenes/CodeEnterScreen';
import RestrictionsDetailsScreen from './scenes/RestrictionsDetailsScreen';
import AccountsSummaryScreen from './scenes/AccountsSummaryScreen';
import QrCodeScreen from './scenes/QrCodeScreen';
import ExportDocumentsScreen from './scenes/ExportDocumentsScreen';
import HistoryFilterScreen from './scenes/HistoryFilterScreen';

import SubscriptionScreen from './scenes/SubscriptionScreen';
//import SubscriptionsFilterScreen from './scenes/SubscriptionsFilterScreen';
//import SubscriptionCreateScreen from './scenes/SubscriptionsCreateScreen';

import ProfileScreen from './scenes/ProfileScreen';
import SettingsScreen from './scenes/SettingsScreen';
import MyTspScreen from './scenes/MyTspScreen';
import MessagesScreen from './scenes/MessagesScreen';
import MessageModal from './scenes/MessagesScreen/MessageModal';
import ForgotPasswordScreen from './scenes/ForgotPasswordScreen';
import { navigationRef } from './rootNavigation';
import ConfirmSmsScreen from './scenes/ConfirmSmsScreen';
import { HeaderBackButton } from '@react-navigation/elements';
import LoadingScreen from './scenes/LoadingScreen';
import PermanentQrCodeScreen from './scenes/PermanentQrCodeScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import PdfViewerScreen from './scenes/PdfViewerScreen';
import ChangePasswordScreen from './scenes/ChangePasswordScreen';
import AccountStatementScreen from './scenes/AccountStatementScreen';
import MessageToBankScreen from './scenes/MessageToBankScreen';
import GlobalLoader from './scenes/GlobalLoader';
import RefundScreen from './scenes/RefundScreen';
import NoInternetScreen from './scenes/NoInternetScreen';
import CancelPaymentModal from './scenes/QrCodeScreen/CancelPaymentModal';
import SubscriptionCreateScreen from './scenes/SubscriptionCreateScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

interface IRootProps extends IThemeable {
  layout: LayoutType,
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function Root(props: IRootProps) {
  const navigationTheme = props.theme === 'light' ? MyTheme : DarkTheme;
  Colors.setScheme(props.theme);
  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      <Stack.Navigator screenOptions={options => ({
        gestureEnabled: false,
        headerBackTitleVisible: false,
        headerLeft: () => TintedBack(options),
        animation: Platform.OS === 'android' ? 'slide_from_right' : undefined,
      })}>
        <Stack.Group screenOptions={{headerStyle: { backgroundColor: props.theme === 'light' ? 'white' : 'black', },
          headerShadowVisible: false,
        }}>

          {AuthLayout()}

          <Stack.Screen name="LoadingScreen"
            component={LoadingScreen}
            options={{
              headerShown: false,
              animationTypeForReplace: 'push',
              animation: 'fade',
            }}
          />

          <Stack.Screen name="MyTspScreen"
            component={MyTspScreen}
            options={{ headerShown: false,
            }}
          />

          <Stack.Screen name="NewOrderScreen" component={NewOrderScreen} options={{
            title: 'Новый заказ',
          }}/>

          <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{
            title: 'История',
          }}/>

          <Stack.Screen name="SubscriptionScreen" component={SubscriptionScreen} options={{
            title: 'Подписки',
          }}/>

          <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} options={{
            title: 'Подробнее о счете',
          }}/>

          <Stack.Screen name="AccountsSummaryScreen" component={AccountsSummaryScreen} options={{
            title: 'Подробнее о счетах',
          }}/>

          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
            title: 'Профиль',
          }} />

          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{
            title: 'Настройки'
          }} />

          <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{
            title: 'Сообщения'
          }} />

          <Stack.Screen name="PdfViewerScreen" component={PdfViewerScreen} options={{
            title: 'Просмотр PDF',
          }} />

          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{
            title: 'Смена пароля'
          }} />

          <Stack.Screen name="SubscriptionCreateScreen" component={SubscriptionCreateScreen} options={{
            title: 'Привязка счета',
          }}/>

        </Stack.Group>
        <Stack.Group screenOptions={{
          presentation: 'modal',
          headerStyle: {backgroundColor: props.theme === 'light' ? 'white' : '#222222', shadowOpacity: 0,},
          headerShown: false,
          gestureEnabled: true,
          animation: Platform.OS === 'android' ? 'slide_from_bottom' : undefined,
        }}>
          <Stack.Screen name="RestrictionsDetailsScreen" component={RestrictionsDetailsScreen} />
          <Stack.Screen
            options={{
              gestureEnabled: false,
            }}
            name="QrCodeScreen" component={QrCodeScreen}
          />
          <Stack.Screen name="ExportDocumentsScreen" component={ExportDocumentsScreen} />
          <Stack.Screen name="HistoryFilterScreen" component={HistoryFilterScreen} />

          

          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="MessageToBankScreen" component={MessageToBankScreen} />
          <Stack.Screen name="CancelPaymentModal" component={CancelPaymentModal}
                        options={{
                          gestureEnabled: false,
                        }}
          />
          <Stack.Screen name="MapScreen" component={MapScreen}
            options={{
              presentation: 'fullScreenModal',
            }}
          />
          <Stack.Screen name="NoInternetScreen" component={NoInternetScreen} options={{
            presentation: 'fullScreenModal',
          }} />
          <Stack.Screen name="PermanentQrCodeScreen" component={PermanentQrCodeScreen} />
          <Stack.Screen name="MessageModal" component={MessageModal} />
          <Stack.Screen name="AccountStatementScreen" component={AccountStatementScreen} />
          <Stack.Screen name="RefundScreen" component={RefundScreen} />
        </Stack.Group>

        <Stack.Group screenOptions={{
          presentation: 'transparentModal',
          headerStyle: {backgroundColor: props.theme === 'light' ? 'white' : '#222222', shadowOpacity: 0,},
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
          cardStyle: { backgroundColor: props.theme === 'light' ? 'white' : '#222222'},
        }}>
          <Stack.Screen name="GlobalLoader" component={GlobalLoader} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthLayout() {
  return (
    <>
      <Stack.Screen name="AuthScreen" component={AuthScreen} options={{headerShown: false}}/>
      <Stack.Screen name="PasswordEnterScreen" component={PasswordEnterScreen} options={{title: 'Вход', }} />
      <Stack.Screen name="SelectTspScreen" component={SelectTspScreen} options={(options) => ({
        title: 'Выбор ТСП',
        headerLeft: () => PopToRootButton(options),
      })}/>

      <Stack.Screen name="ConfirmSmsScreen" component={ConfirmSmsScreen} options={(options) => ({
        title: '',
        headerLeft: () => PopToRootButton(options),
      })}/>
      <Stack.Screen name="CodeEnterScreen" component={CodeEnterScreen} options={(options) => ({
        title: 'Короткий доступ',
        headerLeft: () => PopToRootButton(options),
      })} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{
        title: 'Восстановление доступа'
      }} />
    </>
  );
}

function PopToRootButton(props) {
  const onPress = useCallback(() => props.navigation?.popToTop(), [props.navigation]);
  return <HeaderBackButton onPress={onPress} tintColor={BankTheme.colors.link} />
}

function TintedBack(props) {
  const onPress = useCallback(() => props.navigation?.pop(), [props.navigation]);
  return <HeaderBackButton tintColor={BankTheme.colors.link} onPress={onPress} />
}

const mapStateToProps = (state: IReduxState) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, null)(Root);
