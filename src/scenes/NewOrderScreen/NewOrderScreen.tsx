import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView, Dimensions,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Text } from 'react-native-ui-lib';
import ThemedText from '../../components/Themed/Text';
import ThemedTextField from '../../components/Themed/TextField';
import Button from '../../components/Button';
import AddItemToOrder from './components/AddItemToOrder';
import parseMoney from '../../utils/parseMoney';
import themedGrayColor from '../../utils/themedGrayColor';
import ItemInOrder from './components/ItemInOrder';
import { RootStackParamList } from '../../rootStackParamList';
import Link from '../../components/Link';
import { Portal} from '@gorhom/portal';
import BottomSheet from '@gorhom/bottom-sheet';
import { MODAL_DARK } from '../../utils/K';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import SearchTextInput from './components/SearchTextInput';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'NewOrderScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp,
  onClose: () => void,
};

export default function NewOrderScreen(props: INewOrderScreenStateProps & INewOrderScreenDispatchProps & OwnProps) {
  
  const grayColor = themedGrayColor();
  const backgroundColor = useTheme().dark ? 'black' : 'white';
  const { items } = props;
  const snapPoints = 35;

  const ref = useMemo(() => React.createRef<BottomSheetMethods>(), []);

  const screenHeight = Dimensions.get('window').height - 50;
  const isDark = useTheme().dark;

  const [showPnlOtherPay, setShowPnlOtherPay] = useState(false);
  const [showModalPrmCreateSubscr, setShowModalPrmCreateSubscr] = useState(false);

  const [showModalPrmPayWithSubscr, setShowModalPrmPayWithSubscr] = useState(false);

  const [subscrPurpose, setSubscrPurpose] = useState('');
  const [subscrPayerId, setSubscrPayerId] = useState('');
  const [subscrId, setSubscrId] = useState('');


  useEffect(() => {
    if (showPnlOtherPay) {
      ref.current?.expand();
    } else {
      ref.current?.close();
      setShowPnlOtherPay(false);
    }
    return props.navigation.addListener('beforeRemove', () => props.setItems([]));
  }, [props.navigation]);

  const addItem = (item: IOrderEntry) => {
    props.setItems([...items, item]);
  };

  const onChangeCount = (index: number, newCount: number) => {
    items[index].count = newCount;
    props.setItems([...items]);
  };

  const deleteItem = (index: number) => {
    items.splice(index, 1);
    props.setItems([...items]);
  };

  const onMakeQrCodePressed = useCallback(() => props.placeOrder(false, items, props.nds, props.totalSum),
    [items, props.totalSum, props.nds]);

  const onPressPayWithCashLink = useCallback(() => {
    setShowPnlOtherPay(false);
    props.placeOrder(true, items, props.nds, props.totalSum);
  }, [items, props.totalSum, props.nds]);
  
  const onPressPayWithSubscrCreate = useCallback(() => {
    setShowPnlOtherPay(false);
    props.placeOrder(false, items, props.nds, props.totalSum, 
                     'payAndCreateSubscr', subscrPurpose, subscrPayerId, 0);
  }, [items, props.totalSum, props.nds, subscrPurpose, subscrPayerId]);
  
  const close = useCallback(() => {
    ref?.current?.close();
    setShowPnlOtherPay(false);
    setShowModalPrmCreateSubscr(false);
    setShowModalPrmPayWithSubscr(false);
  }, []);


  

  const payWithSubscrId = (id:number) => {
    console.log('_my', id);
    setShowPnlOtherPay(false);
    props.placeOrder(false, items, props.nds, props.totalSum, 
                     'payWithSubscr', '', '', id);
  };

  /*const dataToRender = [];
  props.subscriptions.forEach((value, key) => {
    dataToRender.push({key:value.id, title: '(' + value.id + ') ' + value.description});
        });


  const filter = (el, cond) => {
    if (!cond) {
      return el
    }
    return el.title.match(cond)
  };

  const getDataToRender = (search: string) => {
    console.log('_my serch', search);
    dataToRender.filter(el => filter(el, search));
  };*/
    

  return (
    <SafeAreaView style={{height: screenHeight}}>

      <ScrollView
        style={{backgroundColor, minWidth: 200,}}
        contentContainerStyle={{ zIndex: 4, padding: 0,}}
        keyboardShouldPersistTaps="handled"
      >
        <AddItemToOrder onAddItem={addItem} />

        <View style={styles.spaceBetweenAndPadding}>
          <Text heading2 marginT-24 marginB-8 color={grayColor}>Состав заказа</Text>
          <Text color={grayColor}>{`Товаров: ${items.length}`}</Text>
        </View>

        {items.map((item, index) => (
          <ItemInOrder
            key={index}
            item={item}
            deleteItem={deleteItem}
            onChangeCount={onChangeCount}
            index={index}
          />
        ))}

        <View style={{height: 115, width: '100%'}} />
      </ScrollView>

      {items.length > 0 && (
        <View style={{...styles.qrCodeButtonContainer, backgroundColor}}>
          {false && <Link
            label="Оплата по кассовой ссылке"
            onPress={onPressPayWithCashLink}
            textStyle={styles.linkText}
            containerStyle={styles.linkContainer}
          />}
          <View style={styles.containerBtn}>
            <View style={{width: '70%', marginRight: 18}}>
              <Button label="Сформировать QR-код" filled onPress={onMakeQrCodePressed} />
            </View>
            <View style={{width: '20%'}}>
              <Button label="..." notFilled onPress={() => {setShowPnlOtherPay(true)}} />
            </View>
          </View>
          <View style={styles.spaceBetween}>
            <Text small color={grayColor}>Общая сумма</Text>
            <ThemedText heading2>{parseMoney(props.totalSum)}</ThemedText>
          </View>
          <View>
            <View style={styles.spaceBetween}>
              <Text small color={grayColor}>
                {`В том числе НДС ${props.nds} %`}
              </Text>
              <ThemedText>{parseMoney(props.ndsSum)}</ThemedText>
            </View>
          </View>
        </View>
      )}

      {showPnlOtherPay && (<Portal>

      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalBackground} />
      </TouchableWithoutFeedback>

      <BottomSheet
        backgroundStyle={{backgroundColor: isDark ? MODAL_DARK : 'white'}}
        enablePanDownToClose
        onClose={props.onClose}
        ref={ref}
        index={0}
        snapPoints={[snapPoints + '%']}
      >
        <View style={{padding: 16}}>
          <ThemedText heading>
            Варианты оплаты
          </ThemedText>
          
          <Link
            label="Оплата по кассовой ссылке"
            onPress={onPressPayWithCashLink}
            textStyle={styles.linkText}
            containerStyle={styles.linkContainer}
          />

          <Link
            label="Оплата с привязкой счета"
            onPress={() => {setShowPnlOtherPay(false); setShowModalPrmCreateSubscr(true)}}
            textStyle={styles.linkText}
            containerStyle={styles.linkContainer}
          />

          <Link
            label="Оплата по подписке"
            onPress={() => {
              props.getSubscriptions('');
              setShowPnlOtherPay (false); 
              setShowModalPrmPayWithSubscr(true);
            }}
            textStyle={styles.linkText}
            containerStyle={styles.linkContainer}
          />

        </View>
      </BottomSheet>
      </Portal> )}

      {(<Modal
          transparent
          animationType="fade"
          visible={showModalPrmCreateSubscr}
        >
        <TouchableWithoutFeedback onPress={close}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>

        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, backgroundColor: isDark ? MODAL_DARK : 'white' }}>
            <ThemedText style={styles.modalText}>Описание привязки счета</ThemedText>
            <View style={{width: '100%'}}>
              {(
                <ThemedTextField
                  autoFocus
                  placeholder='Например, оплата кофе'
                  onChangeText={setSubscrPurpose}
                />
              )}
            </View>

            <ThemedText style={styles.modalText}>Идентификатор плательщика</ThemedText>
            <View style={{width: '100%'}}>
              {(
                <ThemedTextField
                  placeholder='Например, номер телефона'
                  onChangeText={setSubscrPayerId}
                />
              )}
            </View>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
              <Button label="Отмена" onPress={close} marginR-16 />
              <Button label="Начать оплату" filled onPress={() => {
                onPressPayWithSubscrCreate();
                setShowModalPrmCreateSubscr(false);
              }} />
            </View>
          </View>
        </View>
      </Modal>)}





      <Modal
        visible={showModalPrmPayWithSubscr}
        animationType="slide"
      >
        <ThemedSafeAreaView modal>
          <ModalScreenHeader
            onClose={() => setShowModalPrmPayWithSubscr(false)}
            title="Выберите подписку"
          />
          <View style={{paddingHorizontal: 8}}>
            <SearchTextInput getSubscriptions={props.getSubscriptions}/>
          </View>

          <ScrollView >
            <FlatList
                  style={{minWidth: 300}}
                  data={props.subscriptions}
                  contentContainerStyle={{paddingBottom: 60, paddingHorizontal: 8}}
                  keyboardShouldPersistTaps="handled"
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={(info) => 
                    <TouchableOpacity
                      key={info.item.id}
                      style={styles.row}
                      onPress={() => {
                        payWithSubscrId(info.item.id);
                        setShowModalPrmPayWithSubscr(false);
                  }}
              >
              <ThemedText subheading>{info.item.description}</ThemedText>
              </TouchableOpacity>
                  }
                  ListEmptyComponent={
                    <ThemedText style={{ alignSelf: 'center' }}>
                      {'Нет подписок'}
                    </ThemedText>
                  }
                />
          </ScrollView>
        </ThemedSafeAreaView>
      </Modal>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  spaceBetweenAndPadding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  qrCodeButtonContainer: {
    padding: 16,
    width: '100%',
    flex: 0,
  },
  linkContainer: {
    width: '100%', justifyContent: 'flex-start', marginBottom: 10, paddingHorizontal: 16, paddingTop: 16,
  },
  linkText: {
    fontSize: 18, fontWeight: '700',
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  modalBackground: {
    position: 'absolute', backgroundColor: 'rgba(0,0,0,0.65)', width: '100%', height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: '85%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left'
  },
  rowTouchable: {
    width: '100%',
    marginTop: 8,
  },
  modalViewFindSubscr: {
    margin: 20,
    width: '85%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  row: {
    marginBottom: 8,
  },
});
