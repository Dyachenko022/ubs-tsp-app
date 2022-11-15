import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import React from 'react';

export default function PdfViewerComponent(props: { file: string}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: props.file }}
      />
    </SafeAreaView>
  );
}
