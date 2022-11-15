import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Modal, View, StyleSheet } from 'react-native';
import ThemedText from '../../../components/Themed/Text';
import themedGrayColor from '../../../utils/themedGrayColor';
import Link from '../../../components/Link';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../../utils/K';

interface IModalForgotLoginProps {
  onClose: () => void,
  visible: boolean,
  openMap: () => void,
}

export default function ModalForgotLogin(props: IModalForgotLoginProps) {
  const backgroundColor = useTheme().dark ? MODAL_DARK : 'white';

  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={props.onClose}>
        <SafeAreaView style={{flex: 1, backgroundColor: themedGrayColor()}}>
          <View style={{...styles.box, backgroundColor }}>
            <ThemedText marginB-32 subheading style={{textAlign: 'center'}}>
              Для востановления имени пользователя (логина) обратитесь в ближайшее
              отделение банка
            </ThemedText>
            <Link label="Показать отделения на карте" onPress={props.openMap} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 24,
    paddingHorizontal: 8,
    marginTop: '45%',
    marginHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
  }
});
