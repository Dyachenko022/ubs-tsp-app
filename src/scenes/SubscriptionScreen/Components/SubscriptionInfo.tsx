import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  Image,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Modal, StyleSheet, ActivityIndicator
} from 'react-native';
import BankTheme from '../../../bankTheme';
import { Text } from 'react-native-ui-lib';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import ThemedText from '../../../components/Themed/Text';
import parseMoney from '../../../utils/parseMoney';
import LinkGroupBox from '../../../components/LinkGroupBox';
import ArrowLeftCurbed from '../../../../assets/arrowLeftCurved.svg';
import Cheque from '../../../../assets/cheque.svg';
import KeyValuePairText from '../../../components/Themed/KeyValuePairText';
import CrossIcon from '../../../../assets/cross.svg';
import ItemInOrder from '../../../components/ItemInOrder';
import { MODAL_DARK } from '../../../utils/K';
import { formatAccountNumber, formatIsoDate } from '../../../utils/text';

interface ISubscriptionInfoState {
  isVisible: boolean,
  isExpanded: boolean,
  loading: boolean,
  subscriptionData: ISubscriptionData | undefined,
}

interface ISubscriptionInfoProps {
  isDark: boolean,
  regimeAccess: RegimeAccess,
}

export default class SubscriptionInfo extends React.Component<ISubscriptionInfoProps, ISubscriptionInfoState> {

  state: ISubscriptionInfoState = {
    isVisible: false,
    isExpanded: false,
    loading: true,
    subscriptionData: undefined,
  }

  componentDidUpdate(prevProps: Readonly<ISubscriptionInfoProps>, prevState: Readonly<ISubscriptionInfoState>, snapshot?: any) {
    if (prevState.isVisible && !this.state.isVisible) {
      this.setState({
        isExpanded: false,
      });
    }
  }

  private bottomSheetRef = React.createRef<BottomSheetMethods>();

  public open = (subscriptionData: ISubscriptionData) => {
    this.setState({ isVisible: true, subscriptionData }, () => {
      this.bottomSheetRef.current?.snapToIndex(1);
    });
  }

  getColorByState = (subscription: ISubscriptionData) => {
    if (subscription.stateName === 'Завершена') return 'green';
    else return 'red';
  }

  render() {
    const grayColor = 'gray';
    const subscriptionData = this.state.subscriptionData;
    if (!subscriptionData || !this.state.isVisible) return null;

    return (
      <Modal
        animationType="none"
        transparent
        visible={this.state.isVisible}
      >
        <TouchableWithoutFeedback onPress={() => this.bottomSheetRef?.current?.close()}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>

        <BottomSheet
          backgroundStyle={{ backgroundColor: this.props.isDark ? MODAL_DARK : 'white' }}
          onClose={() => this.setState({isVisible: false})}
          handleComponent={null}
          enablePanDownToClose
          ref={this.bottomSheetRef}
          index={0}
          snapPoints={['90%', '95%']}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            paddingHorizontal: 16,
            alignItems: 'center'
          }}>
            <ThemedText heading2>
                Подробнее об операции
            </ThemedText>

            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => this.bottomSheetRef?.current?.close()}
            >
              <CrossIcon width={16} height={16} stroke={BankTheme.colors.link} />
            </TouchableOpacity>
          </View>
          <BottomSheetScrollView contentContainerStyle={{ padding: 16, alignItems: 'center' }}>
            <Text marginV-8 color="gray">
              {formatIsoDate(subscriptionData.date, true)}
            </Text>

            <Text color={this.getColorByState(subscriptionData)} marginB-8>
              {subscriptionData.stateName}
            </Text>

            <Text maringB-8 color={grayColor}>
              {subscriptionData.description}
            </Text>

          </BottomSheetScrollView>
        </BottomSheet>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  crossButton: {
    backgroundColor: 'rgba(249, 249, 249, 0.78)',
    width: 32,
    height: 32,
    padding: 8,
    borderRadius: 16,
  },
  modalBackground: {
    position: 'absolute', backgroundColor: 'rgba(0,0,0,0.65)', width: '100%', height: '100%',
  }
});
