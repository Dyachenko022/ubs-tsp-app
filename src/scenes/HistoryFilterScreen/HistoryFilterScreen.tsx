import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ThemedTextField from '../../components/Themed/TextField';
import ModalScreenHeader from '../../components/Themed/ModalScreenHeader';
import Button from '../../components/Button';
import ThemedText from '../../components/Themed/Text';
import ChipRow from '../../components/ChipRow';
import MoneyField from '../../components/Themed/MoneyField';
import ThemedSafeAreaView from '../../components/Themed/SafeAreaView';

type IHistoryFilterScreenProps = IHistoryFilterScreenDispatchProps & IHistoryFilterScreenStateProps;

export default class HistoryFilterScreen extends React.Component<IHistoryFilterScreenProps, IDocumentsFilter> {

  constructor(props: IHistoryFilterScreenProps) {
    super(props);
    this.state = {
      period: props.filter.period,
      typeOperations: props.filter.typeOperations,
      sumFrom: props.filter.sumFrom,
      sumTo: props.filter.sumTo,
      state: props.filter.state,
      identyOfOperation: props.filter.identyOfOperation,
    };
  }

  closeAndApplyFilter =() => this.props.applyFilter(this.state);

  get appliedFilters() {
    return Object.entries(this.state).reduce<number>((accum, value) => value[1] ? accum + 1 : accum, 0);
  }

  render() {
    return (
      <ThemedSafeAreaView modal style={styles.safeArea}>
        <ModalScreenHeader
          onClose={this.props.close}
          title="Фильтр операций"
        />

        <View style={styles.fieldsContainer}>
          <ScrollView
            contentContainerStyle={{padding: 8, }}
            nestedScrollEnabled
          >

            <ThemedText heading2 marginL-8>
              Период
            </ThemedText>

            <ChipRow
              values={['Неделя', 'Месяц', 'Год', 'Все']}
              value={this.state.period}
              onValueChange={(period) => this.setState({ period })}
            />

            <ThemedText heading2 marginL-8>
              Тип операции
            </ThemedText>

            <ChipRow
              allowClear
              values={['Оплата', 'Возврат']}
              value={this.state.typeOperations}
              onClear={() => this.setState({typeOperations: undefined})}
              onValueChange={(typeOperations) => this.setState({ typeOperations })}
            />

            <ThemedText heading2 marginL-8>
              Сумма
            </ThemedText>

            <View style={styles.moneyInputContainer}>

              <MoneyField
                containerStyle={styles.moneyField}
                title="От"
                placeholder="0 ₽"
                value={this.state.sumFrom}
                onChange={(sumFrom) => this.setState({sumFrom})}
              />

              <MoneyField
                containerStyle={styles.moneyField}
                title="До"
                placeholder="0 ₽"
                value={this.state.sumTo}
                onChange={(sumTo) => this.setState({sumTo})}
              />
            </View>

            <ThemedText heading2 marginL-8>
              Состояние
            </ThemedText>

            <ChipRow
              allowClear
              values={['Завершена', 'В процессе', 'Отбракована']}
              value={this.state.state}
              onClear={() => this.setState({state: undefined})}
              onValueChange={(text) => this.setState({ state: text as IDocumentsFilter['state']})}
            />

            <ThemedText heading2 marginL-8>
              Идентификатор операции
            </ThemedText>

            <ThemedTextField
              containerStyle={styles.identyOfOperations}
              value={this.state.identyOfOperation}
              placeholder="Идентификатор операции"
              onChangeText={(identyOfOperation) => this.setState({ identyOfOperation })}
            />

          </ScrollView>

        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.closeAndApplyFilter}
            filled
            label={`Применить фильтры ${this.appliedFilters ? `(${this.appliedFilters.toString()})` : ''}`}
          />
        </View>
      </ThemedSafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: '100%'
  },
  fieldsContainer: {
    flex: 1,
  },
  moneyInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  identyOfOperations: {
    paddingHorizontal: 8,
    marginTop: 8,
  },
  buttonContainer: {
    padding: 16,
  },
  moneyField: {
    flex: 1,
    paddingLeft: 16,
  }
});
