import { View, Text, KeyboardAvoidingView } from '@/components/Themed';
import React, { FC } from 'react';
import MapView, { Region } from 'react-native-maps';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '@/constants/Colors';

type Props = {
  coords: {
    latitude: number;
    longitude: number;
  };
  onSubmit(): void;
  onRegionChangeComplete(region: Region): void;
  setValue(a: string, value: any): void;
};

const LocationForm: FC<Props> = ({
  coords,
  onSubmit,
  onRegionChangeComplete,
  setValue,
}) => (
  <KeyboardAvoidingView>
    <View style={styles.content}>
      <View style={styles.mapBox}>
        <MapView
          onRegionChangeComplete={onRegionChangeComplete}
          style={styles.mapStyle}
          initialRegion={{
            ...coords,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <View style={styles.markerPoint}>
          <Image
            style={styles.marker}
            source={require('assets/images/marker.png')}
          />
        </View>
      </View>

      <View style={styles.inputContent}>
        <Text style={styles.text}>Digita tu dirección:</Text>
        <TextInput
          placeholderTextColor={Colors.grey}
          style={styles.input}
          onChangeText={(value) => setValue('nomenclature', value)}
          placeholder="Cra 30 #75-02"
        />
        <TextInput
          style={styles.inputDescription}
          multiline
          numberOfLines={4}
          maxLength={150}
          placeholderTextColor={Colors.grey}
          onChangeText={(value) => setValue('note', value)}
          placeholder="Agrega instrucciones especificas de tu dirección: referencias, apartamento, urbanización, barrio, etc"
        />
        <TextInput
          placeholderTextColor={Colors.grey}
          style={styles.input}
          onChangeText={(value) => setValue('name', value)}
          placeholder="Nombra tu dirección (opcional): Casa, trabajo"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.btnText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerPoint: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  marker: {
    height: 45,
    width: 50,
    resizeMode: 'contain',
  },
  text: {
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 15,
    fontSize: 15,
  },
  inputContent: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.white,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.grey,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 13,
    height: 40,
  },
  inputDescription: {
    borderColor: Colors.grey,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 13,
    height: 80,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 15,
  },
});

export default LocationForm;