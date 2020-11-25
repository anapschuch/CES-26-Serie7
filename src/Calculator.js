import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// elementos da calculadora
const calculator = [
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '/'],
  ['0', '.', '=', '+'],
];

// componente que renderiza a calculadora
class Calculator extends Component {

// méétodo para retornar linha da calculadora
  Row(column, index) {
    return (
      <View style={styles.row} key={index}>
        {column.map((data, index) => (
          <View style={styles.cell} key={index}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.chooseFunction(data)}>
              <Text style={styles.buttonText}>{data}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  // define ação para quando uma tecla for apertada
  chooseFunction(data) {
    if (data === '+' || data === '-' || data === '/' || data === 'x') {
      return this.props.operationPressed(data);
    } else if (data === '=') {
      return this.props.equalPressed(data);
    } else {
      return this.props.numberPressed(data);
    }
  }

  // se this.props.result for null ou NaN, coloca mensagem de erro
  render() {
    return (
      <View style={styles.gridContainer}>
        <View>
          <Text style={styles.textExpression}>{this.props.display}</Text>
          <Text style={styles.textResult}>
            {this.props.result !== undefined &&
            String(this.props.result) !== 'NaN'
              ? +this.props.result.toFixed(8)
              : 'Erro'}
          </Text>
        </View>
        {calculator.map((column, index) => this.Row(column, index))}
        <View style={styles.row}>
          <View style={styles.cell}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.clearPressed()}>
              <Text style={styles.buttonClear}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridContainer: {
    width: '80%',
    justifyContent: 'center',
    backgroundColor: 'lightslategray',
    padding: 20,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cell: {
    flex: 1,
    margin: 1,
  },
  textExpression: {
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 0,
    minHeight: 50,
    fontSize: 22,
    marginLeft: 5,
    marginRight: 5,
  },
  textResult: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: 24,
    textAlign: 'right',
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    margin: 2,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
  },
  buttonClear: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
  },
});

// display: o que deve ser mostrado como expressão numérica
// result: resultado do cálculo
// enquanto o usuário não clica em =, o resultado é 0 (zero)
function mapStateToProps(state) {
  return {
    display: state.displayE,
    result: state.result,
  };
}

// ações
function mapDispatchToProps(dispatch) {
  return {
    numberPressed: (number) => {
      return dispatch({
        type: 'NUMBER',
        pressed: number,
      });
    },
    operationPressed: (op) => {
      return dispatch({
        type: 'OPERATOR',
        pressed: op,
      });
    },
    equalPressed: () => {
      return dispatch({
        type: 'EQUAL',
      });
    },
    clearPressed: () => {
      return dispatch({
        type: 'CLEAR',
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
