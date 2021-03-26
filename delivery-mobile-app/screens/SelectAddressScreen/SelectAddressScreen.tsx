import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import React from "react";
import { FloatingAction } from "react-native-floating-action";
type Props = {
  actions: Array<any>;
  onPressItem(name: string | undefined): void;
};
export default ({ actions, onPressItem }: Props) => (
  <View style={{ width: "100%", height: "100%" }}>
    <FloatingAction
      color={Colors.orange}
      actions={actions}
      onPressItem={onPressItem}
    />
  </View>
);
