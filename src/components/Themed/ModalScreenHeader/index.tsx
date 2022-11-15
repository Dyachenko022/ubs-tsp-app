import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ThemedText from '../Text';
import CrossIcon from '../../../../assets/cross.svg';
import BankTheme from '../../../bankTheme';

interface IModalScreenHeader {
  onClose?: () => void,
  hideCloseButton?: boolean,
  title: string,
}

export default function ModalScreenHeader(props: IModalScreenHeader) {
  const hideCloseButton = props.hideCloseButton ?? false;
  return (
    <View style={styles.container}>
      <ThemedText subheading style={styles.title}>
        {props.title}
      </ThemedText>
      {!hideCloseButton && (
        <TouchableOpacity onPress={props.onClose} style={styles.crossButton}>
          <CrossIcon stroke={BankTheme.colors.link} width={20} height={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', marginVertical: 16,
  },
  title: {
    width: '100%', textAlign: 'center', paddingHorizontal: 34,
  },
  crossButton: {
    position: 'absolute', right: 16,
  }
});
