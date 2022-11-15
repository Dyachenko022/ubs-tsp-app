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
import { getTspOperationDetails, IGetTspDocumentDetailsRes } from '../../../redux/history/api';
import ItemInOrder from '../../../components/ItemInOrder';
import { MODAL_DARK } from '../../../utils/K';
import { formatAccountNumber, formatIsoDate } from '../../../utils/text';

interface IOperationInfoState {
  isVisible: boolean,
  isExpanded: boolean,
  loading: boolean,
  documentData: IOperationData | undefined,
  additionalInfo: IGetTspDocumentDetailsRes | undefined,
}

interface IOperationInfoProps {
  openReceipt: (id: number) => void,
  openRefund: (id: number, maxAmount: number) => void,
  isDark: boolean,
  regimeAccess: RegimeAccess,
}

export default class OperationInfo extends React.Component<IOperationInfoProps, IOperationInfoState> {

  state: IOperationInfoState = {
    isVisible: false,
    isExpanded: false,
    loading: true,
    documentData: undefined,
    additionalInfo: undefined,
  }

  componentDidUpdate(prevProps: Readonly<IOperationInfoProps>, prevState: Readonly<IOperationInfoState>, snapshot?: any) {
    if (prevState.isVisible && !this.state.isVisible) {
      this.setState({
        additionalInfo: undefined,
        isExpanded: false,
      });
    }
  }

  private bottomSheetRef = React.createRef<BottomSheetMethods>();

  public open = (documentData: IOperationData) => {
    this.setState({ isVisible: true, documentData }, () => {
      this.bottomSheetRef.current?.snapToIndex(1);
    });
  }

  openDetails = () => {
    if (!this.state.isExpanded) {
      this.bottomSheetRef?.current?.snapToIndex(1);
      this.setState({ loading: true });
      getTspOperationDetails(this.state.documentData!.id)
        .then((additionalInfo) => {
          this.setState({ loading: false, additionalInfo });
        })
        .catch((e) => console.error(e));
    }
    this.setState({ isExpanded: !this.state.isExpanded});
  }

  openReceipt = () => {
    if (this.state.documentData) {
      this.setState({ isVisible: false }, () => this.props.openReceipt(this.state.documentData!.id));
    }
  }

  openRefund = () => {
    if (this.state.documentData) {
      this.setState({ isVisible: false }, () => this.props.openRefund(this.state.documentData!.id,
        this.state.documentData!.sum));
    }
  }

  getColorByState = (document: IOperationData) => {
    if (document.stateName === 'Завершена') return 'green';
    else return 'red';
  }

  render() {
    const grayColor = 'gray';
    const documentData = this.state.documentData;
    if (!documentData || !this.state.isVisible) return null;

    const linkItems = [{
      label: 'Квитанция',
      onPress: this.openReceipt,
      icon: <Cheque width={24} height={24} stroke={BankTheme.colors.link} fill={BankTheme.colors.link} strokeWidth={2} />,
    }];
    if (documentData.canBeRefunded && this.props.regimeAccess !== 'Бухгалтер') {
      linkItems.push({
        label: 'Возврат средств',
        onPress: this.openRefund,
        icon: <ArrowLeftCurbed width={24} height={24} stroke={BankTheme.colors.link} strokeWidth={2} />,
      });
    }

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
              {formatIsoDate(documentData.date, true)}
            </Text>

            <Image source={{ uri: documentData.image }} style={{ width: 120, height: 120, borderRadius: 60 }} />

            <ThemedText heading2 marginV-8>
              {parseMoney(documentData.sum)}
            </ThemedText>

            <Text color={this.getColorByState(documentData)} marginB-8>
              {documentData.stateName}
            </Text>

            <ThemedText marginB-8>
              {documentData.payerPhone}
            </ThemedText>

            <Text maringB-8 color={grayColor}>
              {documentData.description}
            </Text>

            <LinkGroupBox
              items={linkItems}
              containerStyle={{ width: '100%', marginVertical: 32 }}
            />

            <KeyValuePairText
              label="Счет зачисления"
              value={formatAccountNumber(documentData.numAccount)}
              containerStyle={{ width: '100%' }}
            />

            <View style={{width: '100%'}}>
              <ExpandableSection
                sectionHeader={
                  <LinkGroupBox items={[{
                    label: 'Детали операции',
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onPress: this.openDetails,
                    icon: <Cheque width={24} height={24} stroke={BankTheme.colors.link} fill={BankTheme.colors.link} strokeWidth={2} />,
                  }]} />
                }
                expanded={this.state.isExpanded}
              >
                <View style={{ width: '100%'}}>

                  {this.state.loading ? (
                    <ActivityIndicator size="large" color="gray" />
                  ) : (
                    <View style={{width: '100%', }}>
                      <KeyValuePairText
                        label="Cтатус операции"
                        value={this.state.additionalInfo?.stateName || ''}
                        containerStyle={{ width: '100%' }}
                      />

                      <KeyValuePairText
                        label="Описание операции"
                        value={documentData.description}
                        containerStyle={{ width: '100%' }}
                      />

                      <KeyValuePairText
                        fontSize={18}
                        label="Идентификатор операции СБП"
                        value={this.state.additionalInfo?.idOperationSbp || ''}
                        containerStyle={{ width: '100%' }}
                      />

                      <KeyValuePairText
                        label="Дата выполнения"
                        value={formatIsoDate(this.state.additionalInfo?.dateProcessing || '', true)}
                        containerStyle={{ width: '100%' }}
                      />

                      <ThemedText small>
                        Состав заказа
                      </ThemedText>

                      <View>
                        {this.state.additionalInfo?.orderedItems?.map((item, index) =>
                          <ItemInOrder
                            key={index.toString()}
                            index={index}
                            itemName={item.name}
                            price={item.sum}
                            count={item.count}
                          />
                        )}
                      </View>
                    </View>
                  )}

                </View>
              </ExpandableSection>
            </View>


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
