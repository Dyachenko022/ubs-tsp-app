import React from 'react';
import { BarChart, YAxis } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { View } from 'react-native';
import { Text } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

interface IChartProps {
  data: AnalyticsDataArray,
}

const formatNumber = (v: number) => {
  if (v < 1000) {
    return v.toString();
  } else if (v >= 1000 && v < 1000000) {
    return (v / 1000).toString() + ' тыс.';
  } else {
    return (v / 1000000).toString() + ' млн.';
  }
};

export default function Chart(props: IChartProps) {
  const isDark = useTheme().dark;
  const data: Array<{
    value: number | undefined,
    namePeriod?: string,
    svg?: {
      fill: string,
    }
  }> = [];
  props.data.forEach((item, index) => {
    data.push({
      value: item.income,
      namePeriod: item.namePeriod,
      svg: {
        fill: 'url(#gradientGreen)'
      }
    });
    data.push(
      {
        value: item.outcome,
        namePeriod: item.namePeriod,
        svg: {
          fill: 'url(#gradientRed)'
        }
      });
    if (index !== props.data.length - 1) {
      data.push({
        value: undefined,
      });
    }
  });


  const GradientGreen = () => (
    <Defs key={'gradientGreen'}>
      <LinearGradient id={'gradientGreen'} x1={'0'} y1={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'-70.16%'} stopColor={'#A1F7CD'} />
        <Stop offset={'149.5%'} stopColor={'#32AC80'} />
      </LinearGradient>
    </Defs>
  );

  const GradientRed = () => (
    <Defs key={'gradientRed'}>
      <LinearGradient id={'gradientRed'} x1={'0'} y1={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'-70.16%'} stopColor={'#FF0000'} />
        <Stop offset={'149.5%'} stopColor={'#AA1020'} />
      </LinearGradient>
    </Defs>
  );
  const Labels = ({ x, y, bandwidth, data }) => (
    data.map(({ value, namePeriod }, index) => {
      if (index === data.length-1 || data[index + 1].value === undefined) return null;
      const originY = 160;
      let rotation = 0;
      const originX = x(index) + bandwidth + 5;
      if (props.data.length > 5) {
        rotation = 45;
      }
      return (
        <Text
          key={index}
          x={originX}
          y={ originY}
          fontSize={ 10 }
          fill={isDark ? 'white' : 'black'}
          alignmentBaseline={ 'middle' }
          textAnchor={ 'middle' }
          rotation={rotation}
          originX={originX}
          originY={originY}
        >
          {namePeriod}
        </Text>
      );})
  );

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
      <YAxis
        data={data}
        yAccessor={({ item }) => item.value}
        contentInset={{ bottom: 40, top: 20}}
        svg={{ fontSize: 10, fill: 'grey' }}
        numberOfTicks={4}
        formatLabel={(value) => formatNumber(value)}

      />
      <BarChart
        style={{ height: 180 , flex: 1, paddingHorizontal: 5}}
        data={data}
        gridMin={0}
        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        yAccessor={({ item }) => item.value}
        contentInset={{ top: 20, bottom: 40 }}
      >
        <GradientGreen />
        <GradientRed />
        <Labels />
      </BarChart>
    </View>
  );
}
