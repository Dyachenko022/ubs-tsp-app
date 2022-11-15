import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View, ViewProps, ActivityIndicator, Modal } from 'react-native';

interface IViewWithLoadingProps extends React.PropsWithChildren<ViewProps> {
  loading: boolean,
}

export default function ViewWithLoading(props: IViewWithLoadingProps) {
  return (
    <View style={{width: '100%', height: '100%'}}>

      <Modal
        transparent={true}
        visible={props.loading}
      >
        <View style={{backgroundColor: 'rgba(128,128,128,0.35)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      </Modal>
      {props.children}
    </View>
  );
}
