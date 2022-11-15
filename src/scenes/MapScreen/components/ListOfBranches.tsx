import React from 'react';
import { View, FlatList, ListRenderItemInfo, StyleSheet, Linking } from 'react-native';
import KeyValuePairText from '../../../components/Themed/KeyValuePairText';
import ThemedText from '../../../components/Themed/Text';
import Button from '../../../components/Button';
import { Text } from 'react-native-ui-lib';
import { useTheme } from '@react-navigation/native';
import Link from '../../../components/Link';

interface IListOfBranchesProps {
  points: IMapPoint[],
  showOnMap: (pointIndex: number) => void,
}

export default function ListOfBranches(props: IListOfBranchesProps) {
  const isDark = useTheme().dark;

  const renderItem = (item: ListRenderItemInfo<IMapPoint>) => {
    const point = item.item;
    return (
      <View>
        <ThemedText heading2 marginB-16>
          {point.name}
        </ThemedText>
        <KeyValuePairText label="Адрес" value={point.address} />
        <KeyValuePairText label="Режим работы" value={point.working} />

        <Text small marginB-8 color={isDark ? 'rgba(255,255,255, 0.6)' : 'rgba(46, 61, 73, 0.6)'}>
          Бесплатно по России
        </Text>
        <Link label={point.phone} onPress={() => Linking.openURL(`tel:${point.phone}`)} />

        <View style={{marginVertical: 16}}>
          <Button label="Показать на карте" onPress={() => props.showOnMap(item.index)}/>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={props.points}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  }
});
