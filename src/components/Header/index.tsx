import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { Badge } from 'react-native-ui-lib';
import UserIcon from '../../../assets/avatar.png';
import BellIcon from '../../../assets/bell.svg';

interface IHeaderProps {
  name: string,
  avatarImage: string | undefined,
  countOfUnreadMessages?: number,
  onProfilePress: () => void,
  onMessagesPress?: () => void,
  showMessagesIcon?: boolean,
}

export default function Header(props: IHeaderProps) {
  const imageSource: ImageSourcePropType = props.avatarImage ? { uri: props.avatarImage } : UserIcon;

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={props.onProfilePress}>
        <Image source={imageSource} style={styles.profileImage} />
      </TouchableOpacity>

      <View style={{flex: 1}}>
        <Text style={styles.userNameText}>
          {props.name}
        </Text>
      </View>

      {props.showMessagesIcon && (
        <TouchableOpacity style={{height: 30, width: 30}} onPress={props.onMessagesPress}>
          {(props.countOfUnreadMessages ?? 0) > 0 && (
            <Badge
              backgroundColor="red"
              labelFormatterLimit={2}
              label={props.countOfUnreadMessages?.toString()}
              style={styles.badge}
            />
          )}
          <BellIcon height={24} width={24} fill="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%', height: 75,
    paddingHorizontal: 16,
    marginVertical: 5, flexDirection: 'row', alignItems: 'center'
  },
  profileImage: {
    height: 40, width: 40, borderRadius: 25,
  },
  userNameText: {
    color: 'white', fontSize: 14, paddingLeft: 10, paddingRight: 10,
  },
  badge: {
    position: 'absolute', zIndex: 4, top: -10, right: -5,
  }
});
