import React, { useState, useEffect, useRef, useCallback } from "react";

import { View, Text, SectionList, SectionListData, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import AddIcon from '../../../assets/add.svg';


import { getSubscriptions, deleteSubscription, setFilter } from '../../redux/subscription/actions';

import SectionedSubscriptionsList from "./components/SectionSubscriptionsList";
import { navigate } from "../../rootNavigation";

import bankTheme from "../../bankTheme";

const SubscriptionScreenTwo = (props: any) => {
  const dispatch = useDispatch();

  const subscriptions = useSelector(store => store.subscriptions)

  const user = useSelector(store => store.user);

  const [searchInput, setSearchInput] = useState<string>('')

  const [loading, setLoading] = useState(false);

  const [numPage, setNumPage] = useState<number>(1);

  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    let timeout;
    if(firstRender.current) {
      firstRender.current = false;
    } else {
      timeout = setTimeout(() => {
        fetchSubscriptionsWithSearch()
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [searchInput])

  useEffect(() => {
    dispatch(getSubscriptions(true, numPage));
  }, [numPage])

  // Получение списка подписок
  const fetchSubscriptions = async () => {
    dispatch(getSubscriptions(true, numPage));
  }

  const fetchSubscriptionsWithSearch = () => {
    dispatch(setFilter({...subscriptions?.filter, searchString: searchInput}))
    dispatch(getSubscriptions(true, 1))
  }

  const SearchInput = useCallback(() => {
    return (
      <View style={styles.searchFieldContainer}>
        <TextInput style={{ width: '88%', 
                            backgroundColor: 'rgba(rgba(118, 118, 128, 0.12)', 
                            borderRadius: 10, 
                            padding: 8 
                          }} 
                   value={searchInput}
                   clearButtonMode="always"
                   onChangeText={setSearchInput} />

        <TouchableOpacity onPress={() => {
          navigate('CreateSubscriptionScreenTwo');
        }}>
          <AddIcon stroke={bankTheme.colors.link} 
                   fill={bankTheme.colors.link} 
                   width={32} 
                   height={32}/>
        </TouchableOpacity>
      </View>
    )
  }, [searchInput])

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        {SearchInput()}

        <View style={{flex: 1, 
                      padding: 10
                    }}>
        <SectionedSubscriptionsList subscriptions={subscriptions.subscriptions} 
                                    loading={subscriptions.loading}
                                    onRefresh={() => {
                                      numPage === 1 ?  fetchSubscriptions() : setNumPage(1);
                                      setLoading(true);
                                    }}
                                    onEndReached={() => {
                                      setNumPage(numPage + 1)
                                    }}
                                    ListEmptyComponent={() => {
                                      return (
                                        <View style={{
                                          padding: 10
                                        }}>
                                          <Text style={{fontSize: 20, textAlign: 'center'}}>
                                            Подписки отсутствуют
                                          </Text>
                                        </View>
                                      )
                                    }}
                                    regimeAccess={user?.regimeAccess}
                                    deleteSubscription={(id) => {
                                      dispatch(deleteSubscription(id))
                                      dispatch(getSubscriptions(true, 1))
                                    }} />
        </View>
      </SafeAreaView>
    </View>
  )

}

export default SubscriptionScreenTwo;

const styles = StyleSheet.create({
  searchFieldContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})