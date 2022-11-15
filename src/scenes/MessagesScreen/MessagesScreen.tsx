import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Text } from 'react-native-ui-lib';
import ThemedText from '../../components/Themed/Text';
import ButtonsBar from '../../components/Themed/ButtonsBar';
import Button from '../../components/Button';
import AttachmentIcon from '../../../assets/attachment.svg';
import BankTheme from '../../bankTheme';
import LetterIcon from '../../../assets/letter.svg';
import OutboxIcon from '../../../assets/outbox.svg';
import { parseISO, format } from 'date-fns';
import themedGrayColor from '../../utils/themedGrayColor';

export default function MessagesScreen(props: IMessagesScreenStateProps & IMessagesScreenDispatchProps) {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const colorGray = themedGrayColor();

  useEffect(props.updateMessages, []);
  // Чтобы после каждого входа на страницу, фильтр был на входящих
  useEffect(() => {
    return () =>  props.changeMessagesType('incoming');
  }, []);

  const onChangeFilter = useCallback((newIndex) => {
    props.changeMessagesType(newIndex === 0 ? 'incoming' : 'sent');
    setNumPages(1);
    setSelectedButtonIndex(newIndex);
  }, []);

  const onBottomReached = useCallback(() => {
    // Добавить увелечение numPages и запрос сообщений
    if (!props.isLoading && props.messages.length > 18) {
      props.loadMoreMessages(numPages + 1);
      setNumPages(numPages + 1);
    }
  }, [props.messages.length]);

  const renderItem = useCallback((item: ListRenderItemInfo<IMessage>) => {
    const message = item.item;
    return (
      <TouchableOpacity
        key={message.guid}
        style={styles.messageRowContainer}
        onPress={() => props.onPressMessage(message)}
      >
        <View style={styles.iconColumn}>
          <View style={styles.letterIcon}>
            {message.type === 'messageIn' ? (
              <LetterIcon fill={BankTheme.colors.link} width={24} height={24} />
            ) : (
              <OutboxIcon fill={BankTheme.colors.link} width={24} height={24} />
            )}
          </View>
          {message.hasAttachments && (
            <AttachmentIcon width={24} height={24} fill="#7D7FBC" />
          )}
        </View>
        <View style={{ width: '90%' }}>
          <Text small marginB-8 color={colorGray}>
            {format(parseISO(message.time), 'dd.MM.yyyy HH:mm')}
          </Text>
          <ThemedText heading2 style={{ fontWeight: message.unread ? 'bold' : 'normal', }}>
            {message.title}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ButtonsBar
        buttons={['Входящие', 'Исходящие']}
        selectedIndex={selectedButtonIndex}
        onChangeSelectedIndex={onChangeFilter}
      />
      <FlatList

        onRefresh={props.updateMessages}
        refreshing={props.isLoading}
        data={props.messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.guid}
        onEndReached={onBottomReached}
        ListEmptyComponent={
          <ThemedText style={{ alignSelf: 'center' }}>
            {props.isLoading ? '' : 'Нет сообщений'}
          </ThemedText>
        }
      />
      <View style={styles.button}>
        <Button
          label="Написать в банк"
          onPress={props.openSendMessageToBankScreen}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messageRowContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 24,
    marginLeft: 12,
    marginBottom: 16,
    minHeight: 40,
    paddingRight: 5,
  },
  iconColumn: {
    paddingRight: 8,
    alignItems: 'center',
  },
  letterIcon : {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D7E0EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 15,
  }
});
