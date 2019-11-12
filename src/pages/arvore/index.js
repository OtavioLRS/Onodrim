
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';

export default class Arvore extends Component {
  // componentDidMount(){
  //   alert(Camera.state);
  // }

  retrieveData = async () => {
    const value = JSON.parse(await AsyncStorage.getItem('foto'));
    alert(value.path);
  }

  componentDidMount() {
    this.retrieveData();
  }

  render(){
    return(
      <View>
        <Text></Text>
      </View>
    );
  }
}