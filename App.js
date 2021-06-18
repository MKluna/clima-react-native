import React, {useEffect, useState} from 'react';
import {API_KEY} from '@env';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const [busqueda, setbusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Sin Resultados', [{text: 'Entendido '}]);
  };

  const [consultar, setconsultar] = useState(false);
  const [resultado, setresultado] = useState({});
  const [bgColor, setbgColor] = useState('rgb(71,149,212)');

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;
        try {
          const respuesta = await fetch(url);
          const result = await respuesta.json();
          setresultado(result);
          setconsultar(false);
          const kelvin = 273.15;
          const {main} = result;
          const actual = main.temp - kelvin;
          if (actual < 10) {
            setbgColor('rgb( 105, 108, 149 )');
          } else if (actual >= 10 && actual < 25) {
            setbgColor('rgb(71, 149, 212)');
          } else {
            setbgColor('rgb( 178, 28, 61)');
          }
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultar]);

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setbusqueda={setbusqueda}
              setconsultar={setconsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
