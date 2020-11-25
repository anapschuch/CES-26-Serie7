import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/index';
import Calculator from './src/Calculator';

// Identificação e calculadora
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Desenvolvido por:</Text>
        <Text style={{ marginBottom: 10 }}>Ana Paula Lopes Schuch</Text>
        <Calculator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
