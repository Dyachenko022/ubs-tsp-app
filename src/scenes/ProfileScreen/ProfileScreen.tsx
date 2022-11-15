import React, { useState } from 'react';
import BankTheme from '../../bankTheme';
import { Image, ImageSourcePropType, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Link from '../../components/Link';
import ThemedText from '../../components/Themed/Text';
import KeyValuePairText from '../../components/Themed/KeyValuePairText';
import LinkGroupBox from '../../components/LinkGroupBox';
import InfoIcon from '../../../assets/info.svg';
import LetterIcon from '../../../assets/letter.svg';
import PinIcon from '../../../assets/pin.svg';
import ExitIcon from '../../../assets/exit.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import SettingsIcon from '../../../assets/settings.svg';
import UserIcon from '../../../assets/avatar.png';
import ImagePicker from '../../components/ImagePicker/index';
import ContactsPanel from '../../components/ContactsPanel';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;
export type ProfileScreenNavigationProps = {
  navigation: OwnNavigationProp
};

export default function ProfileScreen(props: IProfileScreenStateProps & IProfileScreenDispatchProps & ProfileScreenNavigationProps) {
  const settingsButton = () => (
    <TouchableOpacity style={styles.headerButton} onPress={props.openSettings}>
      <SettingsIcon width={24} height={24} fill={BankTheme.colors.link} />
    </TouchableOpacity>
  );

  const [contactsVisible, setContactsVisible] = useState(false);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: settingsButton,
    });
  }, [props.navigation]);

  const imageSource: ImageSourcePropType = props.avatar ? { uri: props.avatar } : UserIcon;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={imageSource} style={styles.image} />

        <Link label="Загрузить фото" onPress={() => setImagePickerVisible(true)} />

        <ImagePicker
          visible={imagePickerVisible}
          onDismiss={() => setImagePickerVisible(false)}
          onImagePick={props.loadAvatar}
        />

        <ThemedText heading marginV-32 style={{ textAlign: 'center' }}>
          {props.name}
        </ThemedText>

        <KeyValuePairText label="Роль" value={props.regimeAccess} containerStyle={styles.keyLabel} />
        <KeyValuePairText label="Организация" value={props.organization} containerStyle={styles.keyLabel} />
        <KeyValuePairText label="Адрес" value={props.address} containerStyle={styles.keyLabel} />
        <KeyValuePairText
          label="Идентификатор ТСП в системе быстрых платежей (СБП)"
          value={props.sbpId}
          containerStyle={styles.keyLabel}
        />
        <KeyValuePairText label="Наименование ТСП" value={props.tspName} containerStyle={styles.keyLabel} />

        <LinkGroupBox items={[{
          label: 'О приложении',
          onPress: props.openAboutScreen,
          icon: <InfoIcon fill={BankTheme.colors.link} width={24} height={24} />
        }, {
          label: 'Связаться с банком',
          onPress: () => setContactsVisible(true),
          icon: <LetterIcon fill={BankTheme.colors.link} width={24} height={24} />
        }, {
          label: 'На карте',
          onPress: props.openMapScreen,
          icon: <PinIcon fill={BankTheme.colors.link} width={24} height={24} />
        }, {
          label: 'Выйти',
          onPress: props.exit,
          icon: <ExitIcon fill={BankTheme.colors.link} width={24} height={24} />
        }]}
        containerStyle={{ width: '100%', marginBottom: 32 }}
        />
      </ScrollView>

      <ContactsPanel
        visible={contactsVisible}
        onClose={() => setContactsVisible(false)}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyLabel: {
    width: '100%',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  headerButton: {
    width: 24,
    height: 24,
    marginTop: 0,
    marginRight: 14,
  }
});

