import React, { useCallback, useEffect, useMemo } from 'react';
import { Portal} from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Linking, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import ThemedText from '../Themed/Text';
import { Text } from 'react-native-ui-lib';
import Link from '../Link';
import themedGrayColor from '../../utils/themedGrayColor';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../utils/K';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../redux/store';

interface IContactsProps {
  visible: boolean,
  onClose: () => void,
}

export default function ContactsPanel(props: IContactsProps) {
  const colorGray = themedGrayColor();
  const isDark = useTheme().dark;

  const moscowRegion = useSelector((state: IReduxState) => state.settingsFront.tspAppInfo.moscowRegion);
  const allRegions = useSelector((state: IReduxState) => state.settingsFront.tspAppInfo.allRegions);
  const email = useSelector((state: IReduxState) => state.settingsFront.tspAppInfo.email);

  //GRI уменьшаем размер всплывающего окна если телефоны не заданы
  const snapPoints = 40 - (!moscowRegion ? 10 : 0) - (!allRegions ? 10 : 0);

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

  if (!props.visible) return null;

  return (
    <Portal>

      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalBackground} />
      </TouchableWithoutFeedback>

      <BottomSheet
        backgroundStyle={{backgroundColor: isDark ? MODAL_DARK : 'white'}}
        enablePanDownToClose
        onClose={props.onClose}
        ref={ref}
        index={0}
        snapPoints={[snapPoints + '%']}
      >
        <View style={{padding: 16}}>
          <ThemedText heading>
            Контакты
          </ThemedText>

          {!!moscowRegion && (
            <>
              <Text color={colorGray} marginB-8 marginV-16 >
                Звонок для жителей Московского региона
              </Text>

              <Link label={moscowRegion.phoneText} onPress={() => Linking.openURL(`tel:+${moscowRegion.phoneLink}`)} />
            </>
          )}

          {!!allRegions && (
            <>
              <Text color={colorGray} marginB-8 marginV-16 >
                Звонок для жителей всех регионов
              </Text>

              <Link label={allRegions.phoneText} onPress={() => Linking.openURL(`tel:+${allRegions.phoneLink}`)} />
            </>
          )}

          <Text color={colorGray} marginB-8 marginV-16 >
            Отправить сообщение в поддержку
          </Text>

          <Link label={email} onPress={() => Linking.openURL(`mailto:${email}`)} />
        </View>
      </BottomSheet>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute', backgroundColor: 'rgba(0,0,0,0.65)', width: '100%', height: '100%',
  },
});
