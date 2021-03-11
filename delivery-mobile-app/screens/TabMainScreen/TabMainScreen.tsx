import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { PopularProducts, SpecialOffers, SearchProduct } from "./components";
import { ScrollView } from "react-native-gesture-handler";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchProduct />
        <SpecialOffers />
        <PopularProducts />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
