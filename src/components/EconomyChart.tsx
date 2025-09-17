import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import { ChartDataPoint } from '../types';

interface Props {
  data: ChartDataPoint[];
}

const EconomyChart: React.FC<Props> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value), 0);

  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                { height: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : 0 },
              ]}
            />
            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>
      <Image
        source={require('../assets/images/fyora-tiny.png')}
        style={styles.fyoraImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180, 
    position: 'relative',
  },
  chartArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EADBC8',
    paddingTop: 10,
    width: "80%",
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '50%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
    minHeight: 5, 
  },
  label: {
    marginTop: 6,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  fyoraImage: {
    position: 'absolute',
    width: 180,
    height: 180,
    resizeMode: 'contain',
    right: -60,
    bottom: 10,
  },
});

export default EconomyChart;