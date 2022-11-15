import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import ListOfBranches from './components/ListOfBranches';
import ButtonsBar from '../../components/Themed/ButtonsBar';
import YandexMap from './components/YandexMap';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';
import PointDetails from './components/PointDetails';

import BankTheme from '../../bankTheme';

interface IMapScreenProps {
  points: Array<IMapPoint>,
  navigation: StackNavigationProp<RootStackParamList, 'MapScreen'>
}

export default function MapScreen(props: IMapScreenProps) {
  const [buttonIndexSelected, setButtonIndexSelected] = useState(0);
  //const latitude = 55.661112;
  //const longitude = 37.626922;
  const latitude = BankTheme.latitude;
  const longitude = BankTheme.longitude;


  const mapRef = useRef<YandexMap>(null);

  const [selectedPoint, setSelectedPoint] = useState<IMapPoint | undefined>();
  const [pointDetailsVisible, setPointDetailsVisible] = useState(false);

  const showPointOnMap = (index: number) => {
    const point = props.points[index];
    setButtonIndexSelected(0);
    mapRef.current?.fitToSuppliedMarkers([parseFloat(point.location.split(',')[0]), parseFloat(point.location.split(',')[1])]);
  };

  const onMarkerPress = useCallback((id: number) => {
    const point = props.points.find((point) => point.id === id);
    if (point) {
      setSelectedPoint(point);
      setPointDetailsVisible(true);
    }
  }, [props.points]);

  return (
    <ThemedSafeAreaView modal style={{flex: 1}}>
      <ModalScreenHeader onClose={() => props.navigation.pop()} title="Отделения" />

      <ButtonsBar
        buttons={['Карта', 'Список']}
        selectedIndex={buttonIndexSelected}
        onChangeSelectedIndex={setButtonIndexSelected}
      />

      <View style={{display: buttonIndexSelected === 0 ? 'flex' : 'none', width: '100%', height: '90%'}}>
        <YandexMap
          ref={mapRef}
          points={props.points}
          initialLatitude={latitude}
          initialLongitude={longitude}
          onMarkerPress={onMarkerPress}
        />
      </View>

      <View style={{display: buttonIndexSelected === 1 ? 'flex' : 'none', flex: 1,}}>
        <ListOfBranches points={props.points} showOnMap={showPointOnMap} />
      </View>

      <PointDetails
        point={selectedPoint}
        visible={pointDetailsVisible}
        onClose={() => {
          setPointDetailsVisible(false);
        }}
      />

    </ThemedSafeAreaView>
  );
}
