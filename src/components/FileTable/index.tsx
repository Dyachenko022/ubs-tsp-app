import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getFileIcon } from '../../utils/getFileIcon';
import { shareFile } from '../../utils/shareFile';
import ThemedText from '../Themed/Text';

interface IFileMapProps {
  files: Array<Array<string>>,
  loading: boolean,
}

export default function FileTable(props: IFileMapProps) {
  if (props.loading) {
    return <ActivityIndicator size="large" color="gray" />;
  }

  return (
    <View style={styles.container}>
      {props.files.map((fileData) => (
        <TouchableOpacity
          key={fileData[0] + fileData[1]}
          onPress={() => shareFile(fileData[0])}
          style={styles.panel}
        >
          <Image source={getFileIcon(fileData[1])} style={{width: 64, height: 64}} />
          <ThemedText small marginT-8>
            {fileData[1]}
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
  }
});
