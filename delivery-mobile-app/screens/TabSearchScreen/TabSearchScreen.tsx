import { Text, View } from "@/components/Themed";
import { Product } from "@edenjiga/delivery-common";
import React, { FC } from "react";
import { NotFound } from "./components";
import { SafeAreaView, TextInput, StyleSheet } from "react-native";

type Props = {
  isLoading: boolean;
  onChangeText(text: string): void;
  products: Array<Product>;
  text: string;
};

const TabSearchScreen: FC<Props> = ({
  onChangeText,
  products,
  text,
  isLoading,
}) => {
  const showNotFound = !products.length && text;
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        defaultValue={""}
      />
      {!isLoading && (
        <View>
          {products.map(({ _id, name }) => (
            <View key={_id}>
              <Text>{name}</Text>
            </View>
          ))}

          {showNotFound ? <NotFound /> : null}
        </View>
      )}
    </SafeAreaView>
  );
};
export default TabSearchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 20,
  },
});
