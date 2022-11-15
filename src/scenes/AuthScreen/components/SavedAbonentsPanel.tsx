import React, { ForwardedRef } from 'react';
import { Portal} from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../../utils/K';

interface ISavedAbonentsPanel {
  listAbonents: AbonentListEntry[],
  onAbonentPress: (abonent: AbonentListEntry) => void,
}

function SavedAbonentsPanel(props: ISavedAbonentsPanel, ref: ForwardedRef<BottomSheetMethods>) {

  const isDark = useTheme().dark;

  return (
    <Portal>
      <BottomSheet
        backgroundStyle={{backgroundColor: isDark ? MODAL_DARK : 'white'}}
        enablePanDownToClose
        ref={ref}
        index={-1}
        snapPoints={['40%']}
      >
        <View style={{padding: 16}}>
          {props.listAbonents.map((abonent) => (
            <TouchableOpacity onPress={() => props.onAbonentPress(abonent)} key={abonent.login}>
              <Text color={ isDark ? 'white' : 'black'}>
                {abonent.abonentName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </Portal>
  );
}

export default React.forwardRef(SavedAbonentsPanel);
