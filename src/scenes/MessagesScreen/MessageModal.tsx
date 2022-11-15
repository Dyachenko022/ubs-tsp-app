import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { format, parseISO } from 'date-fns';
import ThemedText from '../../components/Themed/Text';
import CrossIcon from '../../../assets/cross.svg';
import BankTheme from '../../bankTheme';
import { Text } from 'react-native-ui-lib';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../rootStackParamList';
import Button from '../../components/Button';
import themedGrayColor from '../../utils/themedGrayColor';
import FileTable from '../../components/FileTable';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';
import RenderHtml from 'react-native-render-html';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../utils/K';

type OwnProps = NativeStackScreenProps<RootStackParamList, 'MessageModal'>;

export default function MessageModal(props: OwnProps) {
  const { message, getFiles } = props.route.params;
  const contentWidth = useWindowDimensions().width - 32;
  const isDark = useTheme().dark;
  const colorGray = themedGrayColor();
  const [unread, setUnread] = useState(props.route.params.message.unread);

  const [files, setFiles] = useState<Array<Array<string>>>([]);
  const [loading, setLoading] = useState(false);

  const close = () => props.navigation.pop();

  useEffect(() => {
    const getFilesAsync = async () => {
      if (message.hasAttachments) {
        // Запросить список файлов
        setLoading(true);
        try {
          const files = await getFiles(message.guid);
          setFiles(files);
        } finally {
          setLoading(false);
        }
      }
    };
    void getFilesAsync();
  }, []);

  const markAsRead = useCallback(() => {
    props.route.params.markAsRead(message.guid);
    setUnread(false);
  }, []);

  return (
    <ThemedSafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text color={colorGray} small>
          {format(parseISO(message.time), 'dd.MM.yyyy HH:mm')}
        </Text>
        <TouchableOpacity onPress={close}>
          <CrossIcon stroke={BankTheme.colors.link} width={24} height={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 60}}>

        <ThemedText heading marginB-32>
          {message.title}
        </ThemedText>


        <RenderHtml
          contentWidth={contentWidth}
          source={{ html: message.text }}
          baseStyle={{ color: isDark ? 'white' : 'black', fontSize: 18 }}
        />

        {message.hasAttachments && (
          <View style={{alignItems: 'center', marginTop: 30}}>
            <FileTable files={files} loading={loading} />
          </View>
        )}

      </ScrollView>

      {unread && (
        <View style={{ position: 'absolute', bottom: 30, width: '100%', paddingHorizontal: '10%', backgroundColor: isDark ? MODAL_DARK : 'white',  }}>
          <Button label="Прочитано" onPress={markAsRead} />
        </View>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

