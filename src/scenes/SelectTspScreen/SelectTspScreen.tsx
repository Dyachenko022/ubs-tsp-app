import React, { useEffect } from 'react';
import Text from '../../components/Themed/Text';
import ArrowRightIcon from '../../../assets/arrowRight.svg';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  BackHandler
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import BankTheme from '../../bankTheme';

export type NavigationProp = StackNavigationProp<RootStackParamList, 'SelectTspScreen'>;

interface PropsWithNavigation extends ISelectTspScreen {
  navigation: NavigationProp,
}

export default function SelectTspScreen(props: PropsWithNavigation) {
  const isDark = useTheme().dark;

  useEffect(() => {
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.popToTop();
      return true;
    });
    return () => unsubscribe.remove();
  }, []);

  const renderItem = (info: ListRenderItemInfo<ITspData>) => (
    <TouchableOpacity
      onPress={() => props.onSelectTsp(info.item.id)}
      style={{...styles.itemContainer, borderColor: isDark ? 'white' : 'black', }}
    >
      <Text style={styles.itemText}>
        {info.item.name}
      </Text>
      <View style={{width: 30}}>
        <ArrowRightIcon width={24} height={24} stroke={BankTheme.colors.link} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={props.contracts}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center',
    height: 80, width: '90%', margin: 15,
  },
  itemText: {
    flex: 1, padding: 10,
  }
});
