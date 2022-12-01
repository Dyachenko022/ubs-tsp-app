import React from "react";

import { View, TextInput, StyleSheet } from 'react-native';

import { navigate } from '../../../rootNavigation';

interface propsType {
  getSubscriptions: (searchString: string) => void,
  value: string,
  setValue: (value: string) => void, 
}

const SearchInput = (props: propsType) => {
  return (
    <View style={styles.container}>
      <TextInput />
    </View>
  )
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})