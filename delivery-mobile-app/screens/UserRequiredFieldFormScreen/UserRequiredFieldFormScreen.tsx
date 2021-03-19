import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from "@/components/Themed";
import React from "react";
import { Button } from "react-native";

type Props = {
  onSubmit(): void;
  setValue(a: string, value: any): void;
  nameInitialValue?: string;
  emailInitialValue?: string;
  identificationInitialValue?: string;
};

export default ({
  onSubmit,
  emailInitialValue,
  identificationInitialValue,
  nameInitialValue,
  setValue,
}: Props) => (
  <KeyboardAvoidingView>
    <View style={{ marginTop: 50 }}>
      <Text>UserRequiredFieldFormScreen</Text>
      <TextInput
        onChangeText={(value) => setValue("name", value)}
        placeholder="Nombre"
        defaultValue={nameInitialValue}
      />
      <TextInput
        onChangeText={(value) => setValue("email", value)}
        placeholder="Email"
        defaultValue={emailInitialValue}
      />
      <TextInput
        onChangeText={(value) => setValue("identification", value)}
        placeholder="Identification"
        defaultValue={identificationInitialValue}
      />

      <Button onPress={onSubmit} title="SUBMIT" />
    </View>
  </KeyboardAvoidingView>
);
