import React, { useCallback, useMemo } from 'react';
import {
  Image,
  RefreshControl,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo, StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import ThemedText from '../Themed/Text';
import { dateGroupedOperationsHelper } from '../../utils/dateGroupedOperationsHelper';
import SwipeableRow from '../SwipeableRow';
import ChequeIcon from '../../../assets/cheque.png';
import ArrowLeftCurved from '../../../assets/arrowLeftCurved.png';
import { Text } from 'react-native-ui-lib';
import BankTheme from '../../bankTheme';
import parseMoney from '../../utils/parseMoney';
import { useTheme } from '@react-navigation/native';

interface IDocumentsSectionList {
  loading: boolean,
  documents: IOperationData[],
  openReceipt: (id: number) => void,
  openRefund: (id: number, maxAmount: number) => void,
  onDocumentPressed?: (document: IOperationData) => void,
  onRefresh?: () => void,
  onEndReached?: () => void,
  regimeAccess: RegimeAccess,
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
}

export default function OperationsSectionList(props: IDocumentsSectionList) {
  const refs = useMemo(() => new Map<number, SwipeableRow | null>(), []);
  const sections = useMemo(() => dateGroupedOperationsHelper(props.documents), [props.documents]);
  const isDark = useTheme().dark;

  const closeAllExcept = (id: number) => {
    refs.forEach((value, key) => {
      if (key === id) return;
      value?.close();
    });
  };

  const renderItem = useCallback((data: SectionListRenderItemInfo<IOperationDataPresentable>) => {
    const operation = data.item;
    const rightItems = [{
      label: 'Квитанция',
      labelColor: 'white',
      icon: ChequeIcon,
      onPress: () => props.openReceipt(operation.id),
      gradientColors: ['#A1F7CD', '#32AC80'],
    }];
    if (operation.canBeRefunded && props.regimeAccess !== 'Бухгалтер') {
      rightItems.push({
        label: 'Возврат',
        labelColor: 'white',
        icon: ArrowLeftCurved,
        onPress: () => props.openRefund(operation.id, operation.sum),
        gradientColors: ['#FC4367', '#EA2047'],
      });
    }

    return (
      <TouchableOpacity
        key={operation.id}
        style={styles.rowTouchable}
        onPress={() => props.onDocumentPressed?.(operation)}
      >
        <SwipeableRow
          rightItems={rightItems}
          ref={(r) => refs.set(operation.id, r)}
          onWillOpen={() => closeAllExcept(operation.id)}
        >
          <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
            <View style={{width: 40, height: 40}}>
              <Image
                source={{uri: operation.image}}
                style={{height: 40, width: 40, borderRadius: 20}}
              />
            </View>

            <View style={{flex: 1, paddingLeft: 12}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text color={BankTheme.colors.textGray}>
                  {operation.formattedDate}
                </Text>
                <Text color={getColor(operation)} subheading>
                  {parseMoney(operation.sum, 'RUB')}
                </Text>
              </View>

              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column', maxWidth: '75%'}}>
                  <ThemedText marginB-4 style={styles.font10}>
                    {operation.payerName}
                  </ThemedText>
                  <ThemedText marginB-4 style={styles.font10}>
                    {operation.payerPhone}
                  </ThemedText>
                </View>
                <ThemedText marginB-4 small>
                  {operation.stateName}
                </ThemedText>
              </View>

              <Text marginB-4 color={BankTheme.colors.textGray}>
                {operation.description}
              </Text>
            </View>
          </View>
        </SwipeableRow>
      </TouchableOpacity>
    );
  }, []);

  const renderSectionHeader = useCallback((info: { section: SectionListData<IOperationDataPresentable, IDateGroupedOperationData> }) => {
    return (
      <View style={{...styles.section, backgroundColor: isDark ? 'black' : 'white'}}>
        <ThemedText subheading marginL-8>
          {info.section.title}
        </ThemedText>
      </View>
    );
  }, [isDark]);

  return (
    <SectionList
      style={styles.sectionList}
      contentContainerStyle={{backgroundColor: 'transparent'}}
      renderItem={renderItem}
      sections={sections}
      keyboardDismissMode="interactive"
      renderSectionHeader={renderSectionHeader}
      onEndReached={props.onEndReached}
      ListFooterComponent={props.ListFooterComponent}
      ListHeaderComponent={props.ListHeaderComponent}
      ListEmptyComponent={props.ListEmptyComponent}
      refreshing={props.loading}
      refreshControl={
        <RefreshControl
          refreshing={props.loading}
          onRefresh={props.onRefresh}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  sectionList: {
    flex: 1, backgroundColor: 'transparent',
  },
  buttonGradient: {
    width: 93,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTouchable: {
    width: '100%',
    marginTop: 8,
  },
  section: {
    width: '100%',
  },
  font10: {
    fontSize: 10
  }
});

function getColor(operation: IOperationData) {
  switch (operation.state) {
    case 101:
      if (operation.type === 'refund') {
        return 'red';
      }
      return '#4ECFA8';
    case 100:
      return 'yellow';
    default:
      return 'gray';
  }
}
