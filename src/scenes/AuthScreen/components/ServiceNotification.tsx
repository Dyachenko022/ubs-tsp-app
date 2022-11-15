import React from 'react';
import {
  View, Image, StyleSheet, SafeAreaView
} from 'react-native';
import Button from '../../../components/Button';
import HTML from 'react-native-render-html';


interface IServiceNotificationProps {
  onButtonPressed: () => void,
  notificationData: IServiceNotification,
}

export default function ServiceNotification(props: IServiceNotificationProps) {
  const data = props.notificationData;
  console.warn(data);
  return (
    <SafeAreaView style={{backgroundColor: data.backgroundColorApp, flex: 1}}>
      <View style={styles.logoView}>
        <Image
          style={{
            flex: 1,
            aspectRatio: 1.5,
            marginTop: 20,
            marginBottom: 20,
            resizeMode: 'contain',
          }}
          source={{uri: data.logoApp }}
        />
      </View>

      <HTML
        classesStyles={{
          notificationContent: {
            textAlign: 'center',
            width:'100%',
            display:'flex',
            flexFlow: 'column',
            fontSize: 22,
            paddingTop: 20,
            paddingRight: 15,
            paddingLeft: 15,
            paddingBottom: 20,
          }
        }}
        containerStyle={styles.textView}
        source={{ html: `<div class="notificationContent">${data.text}<br></div>`}}
      />

      <View style={styles.buttonView}>
        {data.type !== 2 &&
          <Button filled label={data.actionName} onPress={props.onButtonPressed} />
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoView: {
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    height:'30%',
  },
  textView: {
    flex: 0,
    height:'60%',
    width:  '100%',
  },
  buttonView: {
    height:'10%',
    width: '100%',
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
