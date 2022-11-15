import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ShareIcon from '../../../assets/share.svg';
import { shareFile } from '../../utils/shareFile';
import PdfViewerComponent from './PdfViewerComponent/index';
import BankTheme from '../../bankTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'PdfViewerScreen'>;

export default function PdfViewerScreen(props: Props) {
  const { file, headerTitle } = props.route.params;

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <TouchableOpacity onPress={() => void shareFile(file)}>
          <ShareIcon stroke={BankTheme.colors.link} width={32} height={32} />
        </TouchableOpacity>
      ),
      headerTitle: headerTitle || 'Просмотр PDF',
    });
  }, [props.navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PdfViewerComponent file={file} />
    </SafeAreaView>
  );
}
