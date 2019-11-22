import React, {Component} from 'react';
import {Drawer, Container, Header, Content, Button} from 'native-base'; 
import Icon from 'react-native-vector-icons';
import {View, Text} from 'react-native';

import {styles} from './styles';

export default class SideBar extends Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        {/* <Icon name="rocket" size={30} color="#900"/> */}
        <Text>Side bar funciona porra caralho vsf</Text>
      </View>
    )
  }
}