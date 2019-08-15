import React, {Component} from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from 'react-native';

// import { teste } from './styles';

export default class App extends Component {
  render() {
    return (
      <View style={teste.fundo}>
        <View style={teste.box}/>
      </View>
    );
  };
}

const teste = StyleSheet.create({
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#F00',
  },
  fundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#550bbc"
  },
})

