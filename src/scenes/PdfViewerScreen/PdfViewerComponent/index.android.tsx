import { Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import React from 'react';

export default function PdfViewerComponent(props: { file: string}) {
  return (
    <Pdf source={{ uri: props.file}}
      style={{
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
      }}
    />
  );
}
