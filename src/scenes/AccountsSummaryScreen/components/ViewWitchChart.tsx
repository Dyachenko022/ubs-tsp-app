import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getAccountsAnalytics } from '../../../redux/accounts/api';
import Chart from './Chart';
import ThemedText from '../../../components/Themed/Text';

interface IViewWitchChartProps {
  typeOfPeriod: 'month' | 'quarter' | 'year',
  period: string,
  darkTheme: boolean,
}

interface IViewWitchChartState {
  loading: boolean;
  loadDataWasCalled: boolean;
  noData: boolean,
  data: AnalyticsDataArray,
}

export default class ViewWithChart extends React.PureComponent<IViewWitchChartProps, IViewWitchChartState> {
  constructor(props: IViewWitchChartProps) {
    super(props);

    this.state = {
      loading: true,
      loadDataWasCalled: false,
      noData: false,
      data: [],
    };
  }

  loadData = () => {
    if (this.state.loadDataWasCalled) return;
    this.setState({ loadDataWasCalled: true });
    void getAccountsAnalytics(this.props.typeOfPeriod, this.props.period)
      .then((response) => {
        const totalSum = response.data.reduce((accum, value) => accum + value.income + value.outcome, 0);
        this.setState({
          data: response.data,
          noData: totalSum === 0,
          loading: false
        });
      });
  }

  render() {

    if (this.state.loading) return (
      <ActivityIndicator size="large" color="gray" style={{marginTop: 30}} />
    );
    if (this.state.noData) return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ThemedText subheading style={{textAlign: 'center'}}>
          За указанный период аналитика недоступна
        </ThemedText>
      </View>
    );

    return (
      <Chart data={this.state.data || []} />
    );
  }
}
