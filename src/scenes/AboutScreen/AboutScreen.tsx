import React from 'react';
import BankTheme from '../../bankTheme';
import { Text } from 'react-native-ui-lib';
import DeviceInfo from 'react-native-device-info';
import { FlatList, Linking, ListRenderItemInfo, View } from 'react-native';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import ThemedText from '../../components/Themed/Text';
import BorderedLink from '../../components/Themed/BorderedLink';
import themedGrayColor from '../../utils/themedGrayColor';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import AutosizeImage from '../../components/AutosizeImage';

type TitleAndHref = {
  title: string,
  href: string,
}

export interface IAboutScreenProps {
  links: Array<TitleAndHref>,
  navigation: StackNavigationProp<RootStackParamList, 'AboutScreen'>,
  license: string,
  address: string,
  bankName: string,
}

export default function AboutScreen(props: IAboutScreenProps) {
  const colorGray = themedGrayColor();

  const renderFlatListItem = (info: ListRenderItemInfo<TitleAndHref>) => (
    <View>
      <BorderedLink
        label={info.item.title}
        onPress={() => Linking.openURL(info.item.href)}
      />
    </View>
  );

  return (
    <ThemedSafeAreaView modal>
      <ModalScreenHeader
        title="О приложении"
        onClose={() => props.navigation.pop()}
      />

      <FlatList
        data={props.links}
        contentContainerStyle={{paddingBottom: 60, paddingHorizontal: 16}}
        renderItem={renderFlatListItem}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={
          <View>
            <AutosizeImage source={BankTheme.images.loginPageLogo} maxHeight={60} />

            <ThemedText heading marginV-24>
              {BankTheme.appName}
            </ThemedText>

            <ThemedText body marginB-16>
              Версия: {DeviceInfo.getVersion()}
            </ThemedText>
          </View>
        }
        ListFooterComponent={
          <View>
            <Text small color={colorGray} marginT-16>
              {props.bankName}
            </Text>
            <Text small color={colorGray} marginT-4>
              {props.address}
            </Text>
            <Text small color={colorGray} marginT-4>
              {props.license}
            </Text>
          </View>
        }
      />
    </ThemedSafeAreaView>
  );
}
