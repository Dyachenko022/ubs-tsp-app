import React, { useCallback, useEffect, useMemo } from 'react';
import { MODAL_DARK } from '../../../utils/K';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import KeyValuePairText from '../../../components/Themed/KeyValuePairText';
import { Text } from 'react-native-ui-lib';
import Link from '../../../components/Link';
import { Linking, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import ThemedText from '../../../components/Themed/Text';

interface IPointDetailsProps {
  point: IMapPoint | undefined,
  visible: boolean,
  onClose: () => void,
}

export default function PointDetails(props: IPointDetailsProps) {
  const isDark = useTheme().dark;
  const ref = useMemo(() => React.createRef<BottomSheetMethods>(), []);

  useEffect(() => {
    if (props.visible) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [props.visible]);

  const close = useCallback(() => {
    ref?.current?.close();
  }, []);

  if (!props.point) return null;
  const point = props.point;

  if (!props.visible) return null;
  return (
    <>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalBackground} />
      </TouchableWithoutFeedback>

      <BottomSheet
        backgroundStyle={{ backgroundColor: isDark ? MODAL_DARK : 'white' }}
        onClose={props.onClose}
        enablePanDownToClose
        ref={ref}
        index={0}
        snapPoints={['60%']}
      >
        <BottomSheetScrollView>
          <View style={styles.padding}>
            <ThemedText heading marginV-8>
              {props.point.name}
            </ThemedText>

            <KeyValuePairText label="Адрес" value={point.address} />

            <KeyValuePairText label="Часы работы" value={point.working} />

            <Text small marginB-8 color={isDark ? 'rgba(255,255,255, 0.6)' : 'rgba(46, 61, 73, 0.6)'}>
              Бесплатно по России
            </Text>
            <Link label={point.phone} onPress={() => Linking.openURL(`tel:${point.phone}`)} />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute', backgroundColor: 'rgba(0,0,0,0.65)', width: '100%', height: '100%',
  },
  padding: {
    paddingHorizontal: 8,
  }
});
