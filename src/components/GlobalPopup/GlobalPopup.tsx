import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FailIcon from '../../../assets/fail.png';
import { Portal } from '@gorhom/portal';

interface IGlobalPopupProps {
  text: string,
  shown: boolean,
  type: PopupType,
  close: () => void,
}

export default function GlobalPopup(props: IGlobalPopupProps) {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showText, setShowText] = useState(true);

  let backgroundColor = '#FDABBB';
  if (props.type === 'success') {
    backgroundColor = 'green';
  } else if (props.type === 'warn') {
    backgroundColor = '#ED9402';
  }

  useEffect(() => {
    if (props.shown) {
      setShowText(true);
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start();
      setTimer(setTimeout(props.close, 6000));
    } else {
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }).start(() => {
        setShowText(false);
      });
      if (timer) clearTimeout(timer);
    }
  }, [props.shown]);

  return (
    <Portal>
      <Animated.View style={{ position: 'absolute', top: moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 45],
      }), width: '100%', paddingHorizontal: 16, zIndex: 222,
      }}>
        <TouchableOpacity onPress={props.close} style={{...styles.lightRedContainer, backgroundColor}}>
          {props.type === 'error' && (
            <Image source={FailIcon} style={styles.icon} />
          )}
          {showText && (
            <Text style={styles.text} textBreakStrategy="highQuality">
              {props.text}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  lightRedContainer: {
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    minHeight: 50,
  },
  text: {
    color: 'white',
    fontSize: 16,
    flex: 1, flexWrap: 'wrap',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
  }
});
