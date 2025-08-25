import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");
const API_URL = "http://10.0.2.2/database/getTransaction.php";
const filterIcon = require("../assets/images/Filter-1.png");

const ProfilePicture: ImageSourcePropType = require("../assets/images/profile-picture.png");
const editImageIcon: ImageSourcePropType = require("../assets/images/edit-image.png");
const editPhoneNumberIcon: ImageSourcePropType = require("../assets/images/phone.png");

const AccountMagsasaka: React.FC = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [chartLabels, setChartLabels] = useState<string[]>(["--"]);
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
    axios
      .get(`${API_URL}?filter=${filter}`)
      .then((response) => {
        const json = response.data;

        if (json.status === "success" && json.data.length > 0) {
          const data = json.data;

          const labels = data.map((item: any) => {
            if (!item.transaction_time) return "--";
            const parts = item.transaction_time.split(" ");
            return parts.length > 1 ? parts[1].slice(0, 5) : "--";
          });

          const prices = data.map((item: any) => {
            const val = Number(item.price);
            return isNaN(val) ? 0 : val;
          });

          const minLength = Math.min(labels.length, prices.length);
          setChartLabels(minLength > 0 ? labels.slice(0, minLength) : ["--"]);
          setChartPrices(minLength > 0 ? prices.slice(0, minLength) : [0]);

          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
          const recent = prices[prices.length - 1];
          setAveragePrice(avg);
          setRecentPrice(recent);

          setTransactions(data);
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
  }, [filter]);

  return (
    <View style={styles.container}>
      {/* Top Gradient with Back Button and Title */}
      <LinearGradient
        colors={["#10AF7C", "#86C778"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.2 }}
        style={styles.topGradient}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/Back-w.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Farmer Profile</Text>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        overScrollMode="never"
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={ProfilePicture} style={styles.profilePicture} />
          <View style={styles.profileInfo}>
            {/* change nalang the texts kase theyre hardcoded*/}
            <Text style={styles.name}>Juan Dela Cruz</Text>
            <Text style={styles.address}>Malolos, Bulacan</Text>
            <Text style={styles.phoneNumber}>09012345678</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editprofileButton}
              onPress={() => {
                /* Handle edit profile action */
              }}
            >
              <Image source={editImageIcon} style={styles.editIcons} />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editphoneButton}
              onPress={() => {
                /* Handle edit phone number action */
              }}
            >
              <Image source={editPhoneNumberIcon} style={styles.editIcons} />
              <Text style={styles.buttonText}>Edit Number</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartContainer}>
          <Text style={styles.activeLabel}>BENTA KADA BUWAN</Text>

          {/* Filter Button */}
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
                yAxisInterval={1}
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
        </View>

        {/* Sold Products Section */}
        <View style={styles.sellHistoryContainer}>
          <Text style={styles.activeLabel}>MGA NABILING PRODUKTO</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#2e7d32" />
          ) : transactions.length === 0 ? (
            <Text
              style={{ color: "#999", fontSize: RFValue(14), marginBottom: 20 }}
            >
              Walang data ng transaksyon.
            </Text>
          ) : (
            <View>
              {/* palitan nalang din here yung data fetched to match the naibentang produkto */}

              {transactions.map((item, index) => (
                <View key={index} style={styles.produktoCard}>
                  <Text style={styles.orderText}>
                    ORDER # {item.product_id}
                  </Text>
                  <Text style={styles.quantityText}>
                    Dami: {item.amount} kilos
                  </Text>
                  <Text style={styles.priceTag}>P{item.price} /kilo</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topGradient: {
    height: height * 0.1,
    width: width * 1.03,
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
    alignSelf: "center",
    justifyContent: "center",
  },
  pageTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(22),
    alignSelf: "center",
  },
  backIcon: {
    position: "absolute",
    left: width * 0.07,
    height: height * 0.04,
    width: width * 0.04,
  },
  scrollView: {
    flex: 1,
    width: width,
    alignSelf: "center",
  },
  profileContainer: {
    marginTop: height * 0.03,
    width: width * 0.9,
  },
  profilePicture: {
    height: height * 0.2,
    width: height * 0.2,
    alignSelf: "center",
  },
  profileInfo: {
    alignItems: "center",
    marginTop: height * 0.02,
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(22),
    color: "#000000",
  },
  address: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(16),
    color: "#575757",
  },
  phoneNumber: {
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(16),
    color: "#575757",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.05,
  },
  editprofileButton: {
    backgroundColor: "#10AF7C",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 12,
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    flexDirection: "row",
    gap: width * 0.02,
  },
  editphoneButton: {
    backgroundColor: "#10AF7C",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 12,
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    flexDirection: "row",
    gap: width * 0.02,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontSize: RFValue(14),
  },
  editIcons: {
    height: height * 0.025,
    width: height * 0.025,
  },
  sellHistoryContainer: {
    marginTop: height * 0.03,
    width: width * 0.9,
  },
  chartContainer: {
    marginTop: height * 0.03,
    width: width * 0.9,
  },
  produktoCard: {
    backgroundColor: "#81c784",
    padding: 15,
    borderRadius: 8,
    marginBottom: height * 0.015,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: RFValue(14),
    color: "#fdd835",
    fontWeight: "600",
  },
  priceTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  activeLabel: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: "#000",
    marginBottom: height * 0.01,
    marginTop: height * 0.03,
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: height * 0.03,
  },
  chartStyle: {
    borderRadius: 16,
  },
});

export default AccountMagsasaka;
