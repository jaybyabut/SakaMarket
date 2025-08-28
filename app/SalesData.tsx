import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";

const API_URL = "http://10.0.2.2/database/getTransaction.php";
const { width, height } = Dimensions.get("window");

const SalesData: React.FC = () => {
  const router = useRouter();
  const { product } = useLocalSearchParams<{ product: string }>();

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [chartLabels, setChartLabels] = useState<string[]>(["--"]);
  const [chartPrices, setChartPrices] = useState<number[]>([0]);
  const [averagePrice, setAveragePrice] = useState<number>(0);
  const [recentPrice, setRecentPrice] = useState<number>(0);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState("month"); // default to month

  const filterLabels: Record<string, string> = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    "6months": "Last 6 Months",
    year: "This Year",
    lifetime: "Lifetime",
  };

  const handleFilter = (range: string) => {
    setFilter(range);
    setFilterVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}?filter=${filter}&product=${encodeURIComponent(product || "")}`)
      .then((response) => {
        const json = response.data;

        if (json.status === "success" && json.data.length > 0) {
          const data = json.data;

          const labels = data.map((item: any) =>
            item.transaction_time
              ? item.transaction_time.split(" ")[0].slice(5)
              : "--"
          );

          const prices = data.map((item: any) => Number(item.price) || 0);

          setChartLabels(labels.reverse()); // ensure oldest → newest on chart
          setChartPrices(prices.reverse());

          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
          const recent = prices[0]; // newest price (since DESC order)
          setAveragePrice(avg);
          setRecentPrice(recent);

          setTransactions(data); // already DESC from backend
        } else {
          setChartLabels(["--"]);
          setChartPrices([0]);
          setAveragePrice(0);
          setRecentPrice(0);
          setTransactions([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setChartLabels(["--"]);
        setChartPrices([0]);
        setAveragePrice(0);
        setRecentPrice(0);
        setTransactions([]);
        setLoading(false);
      });
  }, [filter, product]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backPosition} onPress={() => router.back()}>
        <Image
          style={styles.backIcon}
          source={require("../assets/STARTer/back-icon.png")}
        />
      </Pressable>

      <View style={styles.scrollViewContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <Text style={styles.title}>{product} Market Overview</Text>
          <Text style={styles.subtitle}>
            Price Trends ({filterLabels[filter]})
          </Text>

          {/* Chart */}
          <View style={styles.chartCard}>
            {loading ? (
              <ActivityIndicator size="large" color="#2e7d32" />
            ) : (
              <LineChart
                data={{
                  labels: chartLabels,
                  datasets: [{ data: chartPrices }],
                }}
                width={Dimensions.get("window").width - 60}
                height={240}
                yAxisSuffix="₱"
                chartConfig={{
                  backgroundColor: "#ffffff",
                  backgroundGradientFrom: "#d4f5d0",
                  backgroundGradientTo: "#a5d6a7",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#2e7d32",
                    fill: "#66bb6a",
                  },
                }}
                bezier
                style={styles.chartStyle}
              />
            )}
          </View>

          {/* Filter Dropdown */}
          <TouchableOpacity
            style={styles.filterBox}
            onPress={() => setFilterVisible(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
              style={styles.filterBoxGradient}
            >
              <View style={styles.filterRow}>
                <Text style={styles.filterText}>{filterLabels[filter]}</Text>
                <Image
                  source={require("../assets/images/down-arrow.png")}
                  style={styles.downArrow}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Price Summary */}
          <View style={styles.priceCard}>
            <Text style={styles.priceText}>
              Average Price:{" "}
              <Text style={styles.bold}>₱{averagePrice.toFixed(2)}/kg</Text>
            </Text>
            <Text style={styles.priceText}>
              Recent Price:{" "}
              <Text style={styles.bold}>₱{recentPrice.toFixed(2)}/kg</Text>
            </Text>
          </View>

          {/* Filter Modal */}
          <Modal
            visible={filterVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setFilterVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.filterPopupContainer}>
                <LinearGradient
                  colors={["#10AF7C", "#28B47B", "#5ABE7A", "#86C778"]}
                  style={styles.filterPopupGradient}
                >
                  <Text style={styles.filterPopupTitle}>Select Range</Text>
                  {Object.entries(filterLabels).map(([key, label]) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleFilter(key)}
                    >
                      <Text
                        style={[
                          styles.filterPopupOption,
                          filter === key && { fontWeight: "bold", textDecorationLine: "underline" },
                        ]}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </LinearGradient>
              </View>
              <TouchableOpacity
                style={styles.modalBackground}
                onPress={() => setFilterVisible(false)}
              />
            </View>
          </Modal>

          {/* Transactions */}
          <Text style={styles.activeLabel}>
            Active Transactions for {product}:
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="#2e7d32" />
          ) : transactions.length === 0 ? (
            <Text style={{ color: "#999", fontSize: 16 }}>
              No transactions available.
            </Text>
          ) : (
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {transactions.map((item, index) => (
                <View key={index} style={styles.transactionCard}>
                  <Text style={styles.orderText}>ORDER #{item.product_id}</Text>
                  <Text style={styles.quantityText}>
                    Dami: {item.amount} kilos
                  </Text>
                  <Text style={styles.priceTag}>₱{item.price}/kilos</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  scrollViewContainer: { top: "4%" },
  backPosition: {
    position: "absolute",
    width: height * 0.03,
    height: height * 0.03,
    zIndex: 1,
    left: width * 0.04,
    top: height * 0.04,
  },
  backIcon: { height: "100%", width: "100%" },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(27),
    color: "#1b5e20",
    marginTop: 10,
  },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 10 },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10,
  },
  chartStyle: { borderRadius: 20 },
  filterBox: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  filterBoxGradient: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  downArrow: {
    width: 12,
    height: 12,
    marginLeft: 6,
    tintColor: "#fff",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  priceCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  priceText: { fontSize: 16, color: "#333", marginBottom: 5 },
  bold: { fontWeight: "bold", color: "#1b5e20" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterPopupContainer: {
    width: 200,
    borderRadius: 20,
    overflow: "hidden",
  },
  filterPopupGradient: { padding: 15, borderRadius: 20 },
  filterPopupTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  filterPopupOption: { fontSize: 14, color: "#fff", marginBottom: 8 },
  modalBackground: { ...StyleSheet.absoluteFillObject },
  activeLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  scrollView: { maxHeight: 300 },
  transactionCard: {
    backgroundColor: "#81c784",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderText: { fontSize: 14, color: "#fff", fontWeight: "bold" },
  quantityText: { fontSize: 14, color: "#fdd835", fontWeight: "600" },
  priceTag: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});

export default SalesData;