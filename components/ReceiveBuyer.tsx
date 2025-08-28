import axios from 'axios';
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type itemCardProps = {
  item: {
    pending_id: number;
    id: number;
    image?: string;
    date: number;
    name: string;
    price: number;
    amount: number;
    seller_name: string;
    delivery_address: string;
  };
  refreshList: () => void; // ✅ receive from parent
};

export default function ReceiveBuyer({ item, refreshList }: itemCardProps) {
  const approveTransaction = async () => {
    try {
      const response = await axios.post('http://10.0.2.2/database/approvePending.php', {
        pending_id: item.pending_id
      });
      console.log("Approve response:", response.data);

      if (response.data.success) {
        alert("Transaction approved!");
        refreshList(); // ✅ refresh the list after approval
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to approve transaction");
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push({ pathname: "/product-page", params: { ...item } })}
    >
      <View style={styles.flexContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image ? { uri: item.image } : require("../assets/images/missing.png")}
            style={styles.itemImage}
          />
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.dayPosted}>10 days ago</Text>
          <Text style={styles.orderNumber}>ORDER ID # {item.id} </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.mainText}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price}</Text>
          </View>

          <Text style={styles.massText}>{item.amount}kg</Text>
          <Text style={styles.farmerName}>{item.seller_name}</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text style={styles.address}>{item.delivery_address}</Text>
          </View>

          <TouchableOpacity onPress={approveTransaction} style={styles.greenBtn}>
            <Text style={styles.btnText2}>Natanggap na</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { elevation: 10, paddingBottom: 12, margin: 10, marginBottom: 5, backgroundColor: "rgb(255,255,255)" },
  flexContainer: { flex: 1, flexDirection: "row" },
  imageContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  itemImage: { width: "80%", height: "70%", resizeMode: "cover" },
  dataContainer: { flex: 2 },
  dayPosted: { textAlign: "right", paddingRight: 10, fontWeight: "100" },
  orderNumber: { fontWeight: "600", fontSize: 15, marginTop: 0 },
  mainText: { fontWeight: "800", fontSize: 20, marginTop: -15, flex: 1 },
  price: { color: "#48BA7A", textAlign: "right", flex: 1, fontSize: 30, fontWeight: "900", paddingRight: 10 },
  massText: { fontWeight: "700", fontSize: 18, marginTop: -8 },
  farmerName: { color: "#565656" },
  address: { flex: 1, color: "#565656", marginBottom: 10 },
  greenBtn: { height: 35, width: "70%", borderRadius: 25, justifyContent: "center", alignItems: "center", backgroundColor: "#10AF7C", marginLeft: 70 },
  btnText2: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
});
