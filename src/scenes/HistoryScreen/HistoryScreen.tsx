import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BankTheme from '../../bankTheme';
import SettingsIcon from '../../../assets/settings.svg';
import ShareIcon from '../../../assets/share.svg';
import OperationInfo  from './Components/OperationInfo';
import ThemedText from '../../components/Themed/Text';
import SearchTextInput from './Components/SearchTextInput';
import OperationsSectionList from '../../components/DocumentsSectionList';
import { useTheme } from '@react-navigation/native';

export default function HistoryScreen(props: IHistoryScreenStateProps & IHistoryScreenDispatchProps) {
  const operationInfoRef = useRef<OperationInfo>(null);
  const isDark = useTheme().dark;
  const [numPage, setNumPage] = useState(1);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>

        <View style={styles.header}>
          <TouchableOpacity onPress={props.openFilterScreen}>
            <SettingsIcon stroke={BankTheme.colors.link} fill={BankTheme.colors.link} width={28} height={28} />
          </TouchableOpacity>

          <SearchTextInput getDocuments={props.getDocumentsWithSearch} />

          <TouchableOpacity onPress={props.openExportDocumentsScreen}>
            <ShareIcon stroke={BankTheme.colors.link} width={32} height={32} />
          </TouchableOpacity>
        </View>

        <OperationsSectionList
          documents={props.documents}
          loading={props.loading}
          openReceipt={props.openReceipt}
          openRefund={props.openRefund}
          regimeAccess={props.regimeAccess}
          onDocumentPressed={(document) => operationInfoRef.current?.open(document)}
          onRefresh={() => props.getDocuments(1)}
          onEndReached={() => {
            if (!props.loading && props.countOpers > props.documents.length) {
              props.getDocuments(numPage + 1);
              setNumPage(numPage + 1);
            }
          }}
          ListFooterComponent={() => {
            if (props.countOpers >= props.documents.length && props.documents.length > 0) return (
              <View style={{width: '100%', alignItems: 'center', marginVertical: 16}}>
                <ThemedText subheading>Больше документов нет</ThemedText>
              </View>
            );
            else return null;
          }}
          ListEmptyComponent={
            <View style={{width: '100%', alignItems: 'center', marginVertical: 16}}>
              <ThemedText subheading>Документов пока нет</ThemedText>
            </View>
          }
        />

      </SafeAreaView>

      <OperationInfo
        ref={operationInfoRef}
        isDark={isDark}
        openReceipt={props.openReceipt}
        openRefund={props.openRefund}
        regimeAccess={props.regimeAccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  }, buttonGradient: {
    width: 93,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, rowTouchable: {
    width: '100%',
    marginTop: 8,
  }, section: {
    width: '100%',
    backgroundColor: 'white'
  }
});
