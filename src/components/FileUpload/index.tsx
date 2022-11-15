import React, { useCallback } from 'react';
import { Text } from 'react-native-ui-lib';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import { getFileIcon } from '../../utils/getFileIcon';
import ThemedText from '../Themed/Text';
import BankTheme from '../../bankTheme';
import PlusIcon from '../../../assets/plus.svg';

export interface FileData {
  fileName: string,
  size: number,
  uri: string,
  type: string,
}

interface IFileUploadProps {
  files: Array<FileData>,
  onFilesChanged: (files: Array<FileData>) => void,
  containerStyle?:  StyleProp<ViewStyle>,
}

export default function FileUpload(props: IFileUploadProps) {

  const onAddFile = useCallback(async () => {
    const res = await DocumentPicker.pickSingle({
      type: [types.allFiles] ,
    });
    const newFiles = [ ...props.files, {
      fileName: res.name,
      uri: res.uri,
      size: res.size!,
      type: res.type || '',
    }];
    props.onFilesChanged(newFiles);
  }, [props.files]);

  const removeFile = useCallback((index: number) => {
    const newFiles = props.files.splice(index, 1);
    props.onFilesChanged(newFiles);
  }, [props.files]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAddFile} style={{width: 100}}>
        <View style={styles.plusIcon}>
          <PlusIcon width={32} height={32} fill="" stroke={BankTheme.colors.link} />
        </View>
        <Text color={BankTheme.colors.link} small style={{width: 100}}>
         Приложить файл
        </Text>
      </TouchableOpacity>

      {props.files.map((fileData, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => removeFile(idx)}
          style={styles.panel}
        >
          <Image source={getFileIcon(fileData.fileName)} style={{width: 64, height: 64}} />
          <ThemedText small marginT-8>
            {fileData.fileName}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: 300,
  },
  panel: {
    width: 100,
    padding: 5,
  },
  plusIcon: {
    borderRadius: 8,
    borderColor: BankTheme.colors.link,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
  }
});

