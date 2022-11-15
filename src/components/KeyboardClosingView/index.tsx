import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View, ViewProps } from 'react-native';

export default function KeyboardClosingView(props: React.PropsWithChildren<ViewProps>) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View {...props}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
}
