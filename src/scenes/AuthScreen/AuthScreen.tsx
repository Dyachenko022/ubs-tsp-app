import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native-ui-lib';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import BankTheme from '../../bankTheme';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import BottomSheet from '@gorhom/bottom-sheet';
import SavedAbonentsPanel from './components/SavedAbonentsPanel';
import { getAbonentsList } from '../../utils/settingsHelper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import EnterByShortCode from './components/EnterByShortCode';
import EnterByLogin from './components/EnterByLogin';
import ServiceNotification from './components/ServiceNotification';
import ModalForgotLogin from './components/ModalForgotLogin';
import ContactsPanel from '../../components/ContactsPanel';

const screenHeight = Dimensions.get('window').height;
const imageHeight = Dimensions.get('window').width / 1.23;
const imageOffset =  440;

type AuthNavigationProps = StackNavigationProp<RootStackParamList, 'AuthScreen'>;

interface IAuthScreenPropsNav extends IAuthScreenProps {
  navigation: AuthNavigationProps,
}

export default function AuthScreen(props: IAuthScreenPropsNav) {
  const [listAbonents, setListAbonents] = useState<AbonentListEntry[]>([]);
  const [serviceNotificationVisible, setServiceNotificationVisible] = useState(true);
  const [modalForgotUserVisible, setModalForgotUserVisible] = useState(false);
  const [updateNotificationVisible, setUpdateNotificationVisible] = useState(true);
  const [contactsVisible, setContactsVisible] = useState(false);
  const isDarkTheme = props.theme === 'dark';
  const savedAbonentsRef = useRef<BottomSheet>(null);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      void getAbonentsList().then((list) => {
        list = list.filter((abonent) => abonent.useShortCode);
        setListAbonents(list);
      });
    });
    props.navigation.addListener('blur', () => {
      setContactsVisible(false);
      savedAbonentsRef.current?.close();
    });
  }, []);

  if (props.serviceNotification && serviceNotificationVisible) {
    return (
      <ServiceNotification
        onButtonPressed={() => setServiceNotificationVisible(false)}
        notificationData={props.serviceNotification}
      />
    );
  }

  if (props.versionAppNotification && updateNotificationVisible) {
    return (
      <ServiceNotification
        onButtonPressed={() => setUpdateNotificationVisible(false)}
        notificationData={props.versionAppNotification}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {!props.shortCodeUsed && (
        <EnterByLogin
          onClickAuth={props.onClickAuth}
          onOpenAbonentList={() => savedAbonentsRef.current?.expand()}
          onClickForgot={() => setModalForgotUserVisible(true)}
          hasListAbonents={listAbonents.length > 0}
        />
      )}

      {props.shortCodeUsed && (
        <EnterByShortCode
          abonentName=""
          onCodeEnter={props.onLoginByCode}
          onExitPressed={props.onStopUsingShortCode}
        />
      )}

      <View style={{
        padding: 5, backgroundColor: isDarkTheme ? 'black' : 'white',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around', zIndex: 4}}>
        <ButtonWithIcon
          label="Контакты"
          icon={BankTheme.images.loginPageCallIcon}
          onPress={() => setContactsVisible(true)}
        />
        <ButtonWithIcon label="На карте" icon={BankTheme.images.loginPageMapIcon} onPress={props.onClickMap} />
        <ButtonWithIcon label="Инфо" icon={BankTheme.images.loginPageInfoIcon} onPress={props.onClickInfo} />
      </View>

      <View
        style={{position: 'absolute', bottom: 0, height: 50, width: '100%', backgroundColor: isDarkTheme ? 'black' : 'white', zIndex: 3}}>
      </View>

      <ContactsPanel
        visible={contactsVisible}
        onClose={() => setContactsVisible(false)}
      />

      <ModalForgotLogin
        visible={modalForgotUserVisible}
        onClose={() => setModalForgotUserVisible(false)}
        openMap={() => {
          setModalForgotUserVisible(false);
          props.onClickMap();
        }}
      />

      <SavedAbonentsPanel
        ref={savedAbonentsRef}
        listAbonents={listAbonents}
        onAbonentPress={(abonent) => {
          savedAbonentsRef.current?.close();
          void props.onSelectAbonent(abonent);
        }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height : screenHeight,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    marginBottom: 24,
    width: 55,
    height: 60
  },
  image: {
    width: '100%',
    height: imageHeight,
    top: imageOffset,
    position: 'absolute',
  }
});
