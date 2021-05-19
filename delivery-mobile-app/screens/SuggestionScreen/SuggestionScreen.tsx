import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  onPress(): void;
  onChangeText(value: string): void;
};
const SuggestionScreen: FC<Props> = ({ onPress, onChangeText }) => (
  <View style={styles.container}>
    <GoBackButton
      title="OPINIONES Y/O SUGERENCIAS"
      viewStyles={styles.goBackButton}
    />
    <ScrollView>
      <View>
        <Text style={styles.title}>
          ¡Tu opinión es importante para nosotros!
        </Text>
        <Text style={styles.description}>
          Déjanos tus comentarios sobre la aplicación y nuestro servicio. Serán
          tomadas en cuenta para mejorarla tu experiencia en ella.
        </Text>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.suggestions}
            multiline={true}
            numberOfLines={8}
            placeholderTextColor={Colors.grey}
            onChangeText={onChangeText}
            placeholder="Escribe aquí tu opinion"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.btnText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  goBackButton: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  inputBox: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  suggestions: {
    backgroundColor: Colors.whiteGrey,
    borderColor: Colors.lightgrey,
    borderRadius: 15,
    borderWidth: 1,
    height: 180,
    paddingHorizontal: 20,
    color: Colors.darkGrey,
    fontSize: 15,
    paddingTop: 15,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
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
    fontWeight: 'bold',
  },
});

export default SuggestionScreen;
