import React, { useState, useEffect } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';

export default function PdfViewerComponent(props: { file: string}) {
  const [localFileUrl, setLocalFileUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    fetchAsyncPdf();

    return () => {
      localFileUrl && ReactNativeBlobUtil.fs.unlink(localFileUrl);
    }
  }, [])

  const fetchAsyncPdf = async () => {
    const fileName = props.file.split('/').pop() || 'unknown.dat';
    
    const response = await ReactNativeBlobUtil.config({
      fileCache: true,
      path: `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`,
    }).fetch('GET', props.file);

    setLocalFileUrl(response.path())
  }

  return (
    <Pdf source={{ uri: localFileUrl}}
         style={{
           flex:1,
           width:Dimensions.get('window').width,
           height:Dimensions.get('window').height,
         }} />
  );
}
