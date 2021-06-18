/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-community/picker';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';

const Formulario = ({busqueda, setbusqueda, setconsultar}) => {
  const {pais, ciudad} = busqueda;

  const [animacionboton] = useState(new Animated.Value(1));

  const animacionEntrada = () => {
    Animated.timing(animacionboton, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const animacionSalida = () => {
    Animated.timing(animacionboton, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Add This line
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };

  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }
    setconsultar(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y país para la búsqueda', [
      {text: 'Entendido '},
    ]);
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            style={styles.input}
            onChangeText={ciudad => setbusqueda({...busqueda, ciudad})}
            placeholder="Ciudad"
            placeholderTextColor="#666"
          />
        </View>
        <View>
          <Picker
            selectedValue={pais}
            itemStyle={{height: 120, backgroundColor: '#FFF'}}
            onValueChange={pais => setbusqueda({...busqueda, pais})}>
            <Picker.Item label="-- Seleccione un país --" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="México" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Perú" value="PE" />
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPress={() => consultarClima()}
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});
export default Formulario;
