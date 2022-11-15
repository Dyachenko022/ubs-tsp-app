import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ThemedText from '../Themed/Text';
import ModalScreenHeader from '../Themed/ModalScreenHeader';
import { Text } from 'react-native-ui-lib';
import ThemedSafeAreaView from '../Themed/SafeAreaView';

interface IAccountsSelectInput {
  placeholder?: string,
  accounts: Array<IAccountDetails>,
  value: number,
  onSelect: (id: number) => void,
  errorText?: string,
  errorTextVisible?: boolean;
}

export default function AccountsSelectInput(props: IAccountsSelectInput) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { accounts, value } = props;
  const selectedAccount = accounts.find((account) => account.id === value);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.input}>
        {selectedAccount ? (
          <>
            <ThemedText subheading>{selectedAccount.accountName}</ThemedText>
            <ThemedText small>{selectedAccount.numAccount}</ThemedText>
          </>
        ) : (
          <ThemedText>
            {props.placeholder || 'Выберите счет'}
          </ThemedText>
        )}
      </TouchableOpacity>
      <View style={{height: 15}}>
        {props.errorTextVisible && (
          <Text color="red" small>
            {props.errorText}
          </Text>
        )}
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
      >
        <ThemedSafeAreaView modal>
          <ModalScreenHeader
            onClose={() => setModalVisible(false)}
            title="Выберите счет"
          />
          <ScrollView contentContainerStyle={{paddingHorizontal: 8}}>
            {props.accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={styles.row}
                onPress={() => {
                  props.onSelect(account.id);
                  setModalVisible(false);
                }}
              >
                <ThemedText subheading>{account.accountName}</ThemedText>
                <ThemedText small>{account.numAccount}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedSafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
  input: {
    height: 44,
    justifyContent: 'flex-end',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  }
});
