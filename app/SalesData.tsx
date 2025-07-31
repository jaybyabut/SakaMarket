import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const API_URL = "http://10.0.2.2/database/getTransaction.php";

const SalesData: React.FC = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [chartLabels, setChartLabels] = useState<string[]>(['--']);
  const [chartPrices, setChartPrices] = useState<number[]>([0]);
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [recentPrice, setRecentPrice] = useState<number>(0);

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        const json = response.data;

        if (json.status === "success" && json.data.length > 0) {
          const data = json.data;

          const labels = data.map((item: any) => {
            if (!item.created_at) return '--';
            const parts = item.created_at.split(' ');
            return parts.length > 1 ? parts[1].slice(0, 5) : '--'; // HH:MM
          });

          const prices = data.map((item: any) => {
            const val = Number(item.price);
            return isNaN(val) ? 0 : val;
          });

          // Ensure equal lengths
          const minLength = Math.min(labels.length, prices.length);
          setChartLabels(minLength > 0 ? labels.slice(0, minLength) : ['--']);
          setChartPrices(minLength > 0 ? prices.slice(0, minLength) : [0]);

          // Average and recent price
          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
          const recent = prices[prices.length - 1];
          setAveragePrice(avg);
          setRecentPrice(recent);

          setTransactions(data);
        } else {
          // Fallback when no data
          setChartLabels(['--']);
          setChartPrices([0]);
          setAveragePrice(0);
          setRecentPrice(0);
          setTransactions([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // Fallback on API failure
        setChartLabels(['--']);
        setChartPrices([0]);
        setAveragePrice(0);
        setRecentPrice(0);
        setTransactions([]);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Titles */}
      <Text style={styles.title}>Palay Market Overview</Text>
      <Text style={styles.subtitle}>Today's Price Trends</Text>

      {/* Chart */}
      <View style={styles.chartCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#2e7d32" />
        ) : (
          <LineChart
            data={{
              labels: chartLabels.map((l) => (typeof l === 'string' ? l : '--')),
              datasets: [{ data: chartPrices.map((p) => (isNaN(p) ? 0 : p)) }],
            }}
            width={Dimensions.get('window').width - 60}
            height={240}
            yAxisSuffix="₱"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#d4f5d0',
              backgroundGradientTo: '#a5d6a7',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: { r: '6', strokeWidth: '2', stroke: '#2e7d32', fill: '#66bb6a' },
            }}
            bezier
            style={styles.chartStyle}
          />
        )}
      </View>

      {/* Prices Section */}
      <View style={styles.priceCard}>
        <Text style={styles.priceText}>
          Average Price: <Text style={styles.bold}>₱{averagePrice.toFixed(2)} /kg</Text>
        </Text>
        <Text style={styles.priceText}>
          Recent Price: <Text style={styles.bold}>₱{recentPrice.toFixed(2)} /kg</Text>
        </Text>
      </View>

      {/* Transaction History */}
      <Text style={styles.activeLabel}>Mga aktibong transaksyon ng palay:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" />
      ) : transactions.length === 0 ? (
        <Text style={{ color: '#999', fontSize: 16 }}>Walang data ng transaksyon.</Text>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {transactions.map((item, index) => (
            <View key={index} style={styles.transactionCard}>
              <Text style={styles.orderText}>ORDER # {item.product_id}</Text>
              <Text style={styles.quantityText}>Dami: {item.amount} kilos</Text>
              <Text style={styles.priceTag}>P{item.price} /kilo</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  backText: { fontSize: 24, color: '#000' },
  title: { fontWeight: '700', fontSize: 28, color: '#1b5e20', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20 },
  chartCard: {
    backgroundColor: '#fff', borderRadius: 16, paddingVertical: 10, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2,
    shadowRadius: 6, elevation: 5, marginBottom: 20,
  },
  chartStyle: { borderRadius: 16 },
  priceCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15,
    shadowRadius: 4, elevation: 3, marginBottom: 20,
  },
  priceText: { fontSize: 18, color: '#333', marginBottom: 5 },
  bold: { fontWeight: 'bold', color: '#1b5e20' },
  activeLabel: { fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 10 },
  scrollView: { maxHeight: 300 },
  transactionCard: {
    backgroundColor: '#81c784', padding: 15, borderRadius: 8, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  orderText: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  quantityText: { fontSize: 14, color: '#fdd835', fontWeight: '600' },
  priceTag: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});

export default SalesData;
