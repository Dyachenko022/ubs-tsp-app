import React, { useState, useRef, useMemo } from 'react';

import { View, SectionList, SectionListData, Text, RefreshControl } from 'react-native';
import SwipeableRow from '../../../components/SwipeableRow';

import DeleteIcon from '../../../../assets/delete.png';

import bankTheme from '../../../bankTheme';

import { dateGroupedOperationsHelper } from "../../../utils/dateGroupedOperationsHelper";

interface SectionListProps  {
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

const SectionedSubscriptionsList = (props: SectionListProps) => {
  const sections = useMemo(() => dateGroupedOperationsHelper(props.subscriptions), [props.subscriptions])

  const refs = useRef<Array<any & SwipeableRow | null>>([]);

  const SectionListItem = ({item}: any) => {
    const rightItems = [{
      label: 'Удалить',
      labelColor: 'white',
      icon: DeleteIcon,
      onPress: () => props.deleteSubscription(item.id),
      gradientColors: ['#FC4367', '#EA2047'],
    }];

    return (
      <SwipeableRow rightItems={rightItems} 
                    onWillOpen={() => {
                      refs.current.map(refItem => {
                        refItem.id !== item.id && refItem.ref?.close()
                      })
                    }}
                    ref={(ref) => refs.current.push({id: item.id, ref})}>
      <View style={{flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'}}>
        <View style={{
                        width: '100%',
                        minHeight: 75,
                        flex: 1
                      }}>
            <Text style={{
              color: '#bfbfbf'
            }}>
              {item.date}
            </Text>
            <Text style={{
              color: '#bfbfbf'
            }}>
              {item.description}
            </Text>
            <Text style={{
              color: '#bfbfbf'
            }}>
              Плательщик: {item.correspCode}
            </Text>
          </View>

          <Text style={{color: item.state === 0 ? 'green' : 'red', 
                        paddingHorizontal: 10}}>
            {item.stateName}
          </Text>
       </View>
      </SwipeableRow>
    )
  }

  return (
    <SectionList sections={sections}
                 onScrollBeginDrag={() => {
                  refs.current.map(item => {
                    item.ref?.close()
                  })
                 }}
                 showsVerticalScrollIndicator={false}
                 onEndReached={props.onEndReached}
                 onRefresh={props.onRefresh}
                 refreshing={props.loading}
                 renderSectionHeader={({ section: { title } }) => (
                  <Text style={{fontSize: 20, 
                                backgroundColor: '#fff', 
                                paddingVertical: 10
                              }}>{title}</Text>
                )}
                 ListEmptyComponent={props.ListEmptyComponent}
                 ListFooterComponent={props.ListFooterComponent}
                 ListHeaderComponent={props.ListHeaderComponent}
                 renderItem={SectionListItem} />
  )
}

export default SectionedSubscriptionsList;
