import React, { useState } from "react";
import { View } from "@/components/Themed";
import { TextInput } from "react-native";
export default () => {
  const [text, setText] = useState("");

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(value) => setText(value)}
        value={text}
      />
    </View>
  );
};
