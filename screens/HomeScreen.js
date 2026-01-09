import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PollItem from "../components/PollItem";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    const res = await fetch(process.env.EXPO_PUBLIC_API_URL + "/api/polls", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (res.ok) {
      const polls = await res.json();
      setData(polls);
    } else {
      setData([{ id: 0, question: "No Poll" }]);
    }
  };
  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  return (
    <View>
      <Text style={styles.heading}>List of Polls</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <PollItem poll={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
});
