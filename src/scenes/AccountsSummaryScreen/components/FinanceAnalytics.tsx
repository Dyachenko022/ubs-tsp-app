import React from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { format, addMonths, setDate, addYears, monthsToQuarters } from 'date-fns';
import ArrowRight from '../../../../assets/arrowRight.svg';
import ArrowLeft from '../../../../assets/arrowLeft.svg';
import ButtonsBar from '../../../components/Themed/ButtonsBar';
import BankTheme from '../../../bankTheme';
import { month } from '../../../utils/dateFormatRelative';
import ViewWithChart from './ViewWitchChart';
import ThemedText from '../../../components/Themed/Text';

const { width: screenWidth } = Dimensions.get('window');

interface IFinanceAnalyticsProps {
  darkTheme: boolean,
}

interface IFinanceAnalyticsState {
  selectedPeriodIndex: number,
  selectedChartIndex: number,
  typePeriod: 'month' | 'quarter' | 'year',
  chartsData: Array<Date>
}


export default class FinanceAnalytics extends React.Component<IFinanceAnalyticsProps, IFinanceAnalyticsState> {

  flatListRef = React.createRef<FlatList>();
  childrenRefs: { [key: string]: ViewWithChart | null} = {};

  constructor(props: IFinanceAnalyticsProps) {
    super(props);
    const currentDate = setDate(new Date(), 1);
    this.state = {
      selectedPeriodIndex: 0,
      selectedChartIndex: 0,
      typePeriod: 'month',
      chartsData: [currentDate, addMonths(currentDate, -1)],
    };
  }

  componentDidMount() {
    this.childrenRefs[`REF-FLATLIST${0}`]?.loadData();
  }

  get datePeriod() {
    return this.state.chartsData[this.state.selectedChartIndex];
  }

  get periodText() {
    switch (this.state.selectedPeriodIndex) {
      case 0: return month(this.datePeriod);
      case 1:
        return `${month(this.datePeriod)} - ${month(addMonths(this.datePeriod, 2))}`;
      case 2: return format(this.datePeriod, 'yyyy');
      default: throw new Error(`periodText - Incorrect parameter - ${this.state.selectedPeriodIndex}`);
    }
  }

  changeTypePeriod = (selectedIndex: number) => {
    const newDatePeriod = setDate(new Date(), 1);
    if (selectedIndex === 1) {
      const month = newDatePeriod.getMonth();
      if (month < 3) {
        newDatePeriod.setMonth(0);
      } else if (month < 6) {
        newDatePeriod.setMonth(3);
      } else if (month < 8) {
        newDatePeriod.setMonth(6);
      } else {
        newDatePeriod.setMonth(9);
      }
    }

    this.flatListRef?.current?.scrollToIndex({ index: 0, animated: false});
    this.setState({
      selectedPeriodIndex: selectedIndex,
      selectedChartIndex: 0,
      chartsData: [newDatePeriod, calculateNextPeriod(selectedIndex, newDatePeriod)],
      typePeriod: indexToTypeOfPeriod(selectedIndex),
    }, () => this.childrenRefs[`REF-FLATLIST${0}`]?.loadData());
  }

  renderItem = (info: ListRenderItemInfo<Date>) => {
    const { index, item } = info;
    return (
      <View key={index} style={styles.flatListItem}>
        <ViewWithChart ref={(ref) => this.childrenRefs = {...this.childrenRefs, [`REF-FLATLIST${index}`]: ref}}
          period={format(item, 'dd.MM.yyyy')}
          typeOfPeriod={this.state.typePeriod}
          darkTheme={this.props.darkTheme}
        />
      </View>
    );
  };

  onScroll = (event:  NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    // Это нужно для того, чтобы слайд не обновлялся на середине,
    // а ближе к правому краю экрана
    const distance = Math.abs(roundIndex - index);
    const offset = 0.4 < distance;

    if (roundIndex !== this.state.selectedChartIndex && !offset) {
      this.setState({ selectedChartIndex: roundIndex });
    }

    if (roundIndex === this.state.chartsData.length - 1) {
      this.childrenRefs[`REF-FLATLIST${roundIndex}`]?.loadData();
      const { chartsData } = this.state;
      const latestPeriod = chartsData[chartsData.length - 1];
      const nextPeriod = calculateNextPeriod(this.state.selectedPeriodIndex, latestPeriod);
      this.setState({chartsData: [...chartsData, nextPeriod]});
    }
  }

  render() {
    return (
      <View>
        <ButtonsBar
          buttons={['Месяц', 'Квартал', 'Год']}
          selectedIndex={this.state.selectedPeriodIndex}
          onChangeSelectedIndex={this.changeTypePeriod}
        />

        <View style={styles.buttonsBar}>
          <TouchableOpacity style={styles.arrow}
            onPress={() => this.flatListRef.current?.scrollToIndex({ index: this.state.selectedChartIndex + 1 })}
          >
            <ArrowLeft stroke={BankTheme.colors.buttonFilled} storke-width={3} />
          </TouchableOpacity>

          <ThemedText subheading>
            {this.periodText}
          </ThemedText>

          <TouchableOpacity
            onPress={() => this.flatListRef.current?.scrollToIndex({ index: this.state.selectedChartIndex - 1 })}
            style={styles.arrow}
            disabled={this.state.selectedChartIndex === 0}
          >
            <ArrowRight stroke={this.state.selectedChartIndex === 0 ? 'gray' : BankTheme.colors.link} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 200 }}>

          <FlatList
            ref={this.flatListRef}
            data={this.state.chartsData}
            renderItem={this.renderItem}
            onScroll={this.onScroll}
            keyExtractor={(item, index) =>  this.state.typePeriod + this.state.chartsData[index].toString()}
            pagingEnabled
            horizontal
            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

function indexToTypeOfPeriod(index: number) : 'month' | 'quarter' | 'year' {
  switch (index) {
    case 0: return 'month';
    case 1: return 'quarter';
    case 2: return 'year';
    default: throw new Error(`indexToTypeOfPeriod - Incorrect parameter - ${index}`);
  }
}

function calculateNextPeriod(index: number, date: Date): Date {
  switch (index) {
    case 0:
      return addMonths(date, -1);
    case 1:
      return addMonths(date, -3);
    case 2:
      return addYears(date, -1);
    default: throw new Error(`changePeriod - Incorrect parameter - ${index}`);
  }
}


const styles = StyleSheet.create({
  arrow: {
    height: 24, width: 24, alignItems: 'center',
  },
  flatList: {
    width: '100%', height: 150, transform: [{ scaleX: -1 }],
  },
  flatListItem: {
    width: screenWidth, height: 150, backgroundColor: 'transparent', transform: [{ scaleX: -1 }],
  },
  buttonsBar: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16,
  }
});
