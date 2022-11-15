import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  I18nManager, TouchableOpacity, ImageSourcePropType, Image, Text
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';

interface IRightItem {
  icon: ImageSourcePropType,
  label: string,
  labelColor: string,
  gradientColors: string[],
  onPress: () => void,
}

interface ISwipeableRowProps {
  rightItems: IRightItem[],
  onWillOpen?: () => void,
}

export default class SwipeableRow extends Component<ISwipeableRowProps, any> {

  private renderRightAction = (item: IRightItem, x: number, progress: Animated.AnimatedInterpolation) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }} key={item.label}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            this.close();
            item.onPress();
          }}
        >
          <LinearGradient colors={item.gradientColors} style={styles.buttonGradient}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={{color: item.labelColor}}>
              {item.label}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation
  ) => (
    <View
      style={{
        width: 93 * this.props.rightItems.length,
        flexDirection: 'row',
      }}>
      {
        this.props.rightItems.map(item => this.renderRightAction(item, 128 * this.props.rightItems.length, progress))
      }
    </View>
  );

  swipeableRow?: Swipeable;

  updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };

  close = () => {
    this.swipeableRow?.close();
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        overshootLeft={false}
        overshootRight={false}
        onSwipeableRightWillOpen={this.props.onWillOpen}
        renderRightActions={this.renderRightActions}>

        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionButton: {
    width: 93,
  },
  buttonGradient: {
    width: 93,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
});
