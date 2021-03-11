import { View, Text } from "@/components/Themed";
import React from "react";
import MapView, { Region } from "react-native-maps";
import { Button, Dimensions, StyleSheet, TextInput } from "react-native";

type Props = {
  coords: {
    latitude: number;
    longitude: number;
  };
  onSubmit(): void;
  onRegionChangeComplete(region: Region): void;
  setValue(a: string, value: any): void;
};

export default ({
  coords,
  onSubmit,
  onRegionChangeComplete,
  setValue,
}: Props) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <MapView
      onRegionChangeComplete={onRegionChangeComplete}
      style={styles.mapStyle}
      initialRegion={{
        ...coords,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
    <View
      style={{
        height: 20,
        width: 20,
        position: "absolute",
        backgroundColor: "red",
      }}
    >
      {/* <View
        style={styles.ubicacionIcon}
      ></View> */}
    </View>
    <Text>LocationScreen</Text>
    <TextInput
      style={{ height: 100 }}
      onChangeText={(value) => setValue("direccion", value)}
      placeholder="Direccion"
    />

    <TextInput
      style={{ height: 100 }}
      onChangeText={(value) => setValue("note", value)}
      placeholder="Intrucciones, casa, edificio numero de apartamento"
    />

    <TextInput
      style={{ height: 100 }}
      onChangeText={(value) => setValue("name", value)}
      placeholder="Nombre"
    />
    <Button onPress={onSubmit} title="SUBMIT" />
  </View>
);

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  ubicacionIcon: {
    resizeMode: "contain",
    height: 40,
    width: 40,
  },
});
