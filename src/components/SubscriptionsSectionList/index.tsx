import React, { useCallback, useMemo } from 'react';
import {
  Image,
  RefreshControl,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo, StyleSheet,
  View
} from 'react-native';
import ThemedText from '../Themed/Text';
import SwipeableRow from '../SwipeableRow';
import DeleteIcon from '../../../assets/delete.png';
import { Text } from 'react-native-ui-lib';
import BankTheme from '../../bankTheme';
import { useTheme } from '@react-navigation/native';
import { dateGroupedOperationsHelper } from '../../utils/dateGroupedOperationsHelper';

interface ISubscriptionsSectionList {
  loading: boolean,
  subscriptions: ISubscriptionData[],
  onRefresh?: () => void,
  onEndReached?: () => void,
  deleteSubscription: (id:number) => void,
  regimeAccess: RegimeAccess,
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
}

export default function SubscriptionsSectionList(props: ISubscriptionsSectionList) {
  const refs = useMemo(() => new Map<number, SwipeableRow | null>(), []);
  const sections = useMemo(() => dateGroupedOperationsHelper(props.subscriptions), [props.subscriptions]);
  const isDark = useTheme().dark;

  const closeAllExcept = (id: number) => {
    refs.forEach((value, key) => {
      if (key === id) return;
      value?.close();
    });
  };

  const renderItem = useCallback((data: SectionListRenderItemInfo<ISubscriptionDataPresentable>) => {
    const subscription = data.item;
    const rightItems = [{
      label: 'Удалить',
      labelColor: 'white',
      icon: DeleteIcon,
      onPress: () => props.deleteSubscription(subscription.id),
      gradientColors: ['#FC4367', '#EA2047'],
    }];

    return (
        <SwipeableRow
          rightItems={rightItems}
          ref={(r) => refs.set(subscription.id, r)}
          onWillOpen={() => closeAllExcept(subscription.id)}
        >
          <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
            <View style={{flex: 1, paddingLeft: 12, marginBottom: 10}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.font12} color={BankTheme.colors.textGray}>
                    {subscription.formattedDate}
                </Text>
              </View>
              
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column', maxWidth: '75%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.font14} color={BankTheme.colors.textGray}>
                      {subscription.description}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.font14} color={BankTheme.colors.textGray}>
                      {'Плательщик: ' + subscription.correspCode}
                    </Text>
                  </View>
                </View>
                <Text color={getColor(subscription.state)}>
                  {subscription.stateName}
                </Text>
              </View>
            </View>
          </View>
        </SwipeableRow>
    );
  }, []);

  const renderSectionHeader = useCallback((info: { section: SectionListData<ISubscriptionDataPresentable, IDateGroupedOperationData> }) => {
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
      deleteSubscription={props.deleteSubscription}
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
  font12: {
    fontSize: 12
  },
  font14: {
    fontSize: 14
  },
});

function getColor(state: number) {
  switch (state) {
    case 0:
      return '#4ECFA8';
    default:
      return 'gray';
  }
}
