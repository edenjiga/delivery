import { View } from "@/components/Themed";
import React, { FC } from "react";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onChangeText(text: string): void;
};
const VerifyCodeScreen: FC<Props> = ({ onChangeText }) => (
  <SafeAreaView>
    <View>
      <TextInput
        placeholder={"Ingresa codigo"}
        onChangeText={onChangeText}
        maxLength={6}
      />
    </View>
  </SafeAreaView>
);

export default VerifyCodeScreen;
