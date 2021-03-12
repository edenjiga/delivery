import { Text, View } from "@/components/Themed";
import { Product } from "@edenjiga/delivery-common";
import React, { FC } from "react";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotFound } from "./components";

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
    <SafeAreaView>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
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
