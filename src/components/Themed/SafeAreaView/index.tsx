import React from 'react';
import { ViewProps, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MODAL_DARK } from '../../../utils/K';

interface IThemedSafeAreaViewProps extends React.PropsWithChildren<ViewProps> {
  modal?: boolean,
}

export default function ThemedSafeAreaView(props: IThemedSafeAreaViewProps) {

  const isDark = useTheme().dark;
  let backgroundColor = 'white';
  if (isDark) {
    if (props.modal) {
      backgroundColor = MODAL_DARK;
    } else {
      backgroundColor = 'black';
    }
  }

  const style = StyleSheet.compose(props.style, { backgroundColor, flex: 1, });

  return (
    <SafeAreaView {...props} style={style}>
      {props.children}
    </SafeAreaView>
  );
}
