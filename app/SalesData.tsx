// SalesData.tsx
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const API_URL = "http://10.0.2.2/database/getTransaction.php";
const filterIcon = require('../assets/images/Filter-1.png');

const SalesData: React.FC = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [chartLabels, setChartLabels] = useState<string[]>(['--']);
  const [chartPrices, setChartPrices] = useState<number[]>([0]);
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [recentPrice, setRecentPrice] = useState<number>(0);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState("week");

  const handleFilter = (range: string) => {
    setFilter(range);
    setFilterVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}?filter=${filter}`)
      .then((response) => {
        const json = response.data;

        if (json.status === "success" && json.data.length > 0) {
          const data = json.data;

          const labels = data.map((item: any) => {
            if (!item.transaction_time) return '--';
            const parts = item.transaction_time.split(' ');
            return parts.length > 1 ? parts[1].slice(0, 5) : '--';
          });

          const prices = data.map((item: any) => {
            const val = Number(item.price);
            return isNaN(val) ? 0 : val;
          });

          const minLength = Math.min(labels.length, prices.length);
          setChartLabels(minLength > 0 ? labels.slice(0, minLength) : ['--']);
          setChartPrices(minLength > 0 ? prices.slice(0, minLength) : [0]);

          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
          const recent = prices[prices.length - 1];
          setAveragePrice(avg);
          setRecentPrice(recent);

          setTransactions(data);
        } else {
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
        setChartLabels(['--']);
        setChartPrices([0]);
        setAveragePrice(0);
        setRecentPrice(0);
        setTransactions([]);
        setLoading(false);
      });
  }, [filter]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Palay Market Overview</Text>
      <Text style={styles.subtitle}>Today's Price Trends</Text>

      <View style={styles.chartCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#2e7d32" />
        ) : (
          <LineChart
            data={{
              labels: chartLabels,
              datasets: [{ data: chartPrices }],
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
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#2e7d32',
                fill: '#66bb6a',
              },
            }}
            bezier
            style={styles.chartStyle}
          />
        )}
      </View>

      {/* 👇 Filter button repositioned and resized */}
      <View style={styles.filterButtonStandalone}>
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <Image source={filterIcon} style={styles.filterIconLarge} />
        </TouchableOpacity>
      </View>

      <View style={styles.priceCard}>
        <Text style={styles.priceText}>
          Average Price: <Text style={styles.bold}>₱{averagePrice.toFixed(2)} /kg</Text>
        </Text>
        <Text style={styles.priceText}>
          Recent Price: <Text style={styles.bold}>₱{recentPrice.toFixed(2)} /kg</Text>
        </Text>
      </View>

      <Modal
        visible={filterVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterPopupContainer}>
            <LinearGradient
              colors={['#10AF7C', '#28B47B', '#5ABE7A', '#86C778']}
              style={styles.filterPopupGradient}
            >
              <Text style={styles.filterPopupTitle}>Filter</Text>
              <TouchableOpacity onPress={() => handleFilter('week')}>
                <Text style={styles.filterPopupOption}>Last Week</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilter('month')}>
                <Text style={styles.filterPopupOption}>Last Month</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilter('6months')}>
                <Text style={styles.filterPopupOption}>Last 6 Months</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilter('lifetime')}>
                <Text style={styles.filterPopupOption}>Lifetime</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <TouchableOpacity style={styles.modalBackground} onPress={() => setFilterVisible(false)} />
        </View>
      </Modal>

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
    shadowRadius: 6, elevation: 5, marginBottom: 10,
  },
  chartStyle: { borderRadius: 16 },
  filterButtonStandalone: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 20,
  },
  filterIconLarge: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
    priceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  priceText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPopupContainer: {
    width: 160,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPopupGradient: {
    width: 120,
    height: 140,
    borderRadius: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingLeft: 15,
  },
  filterPopupTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  filterPopupOption: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  activeLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 300,
  },
  transactionCard: {
    backgroundColor: '#81c784',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 14,
    color: '#fdd835',
    fontWeight: '600',
  },
  priceTag: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SalesData;