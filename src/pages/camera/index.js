import { RNCamera } from 'react-native-camera'
import { StatusBar, Text, View, TouchableHighlight, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './styles';
export default class Camera extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    path: null
  };

  navegar(rota) {
    const navegar = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: rota }),
      ],
    });
    this.props.navigation.dispatch(navegar);
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('foto', JSON.stringify(this.state));
    } catch (e){
      alert(e);
    }
  }

  takePhoto = async () => {
    const options = { 
      quality: 0.5, 
      base64: true, 
      orientation: RNCamera.Constants.Orientation.auto,
      fixOrientation: true,
    };
    const data = await this.camera.takePictureAsync(options);
    this.setState({ path: data.uri });
  };

  exibirFoto() {
    return(
      <View>

        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />

        <TouchableHighlight
          style={styles.ok}
          onPress={() => {
            this.setState({ path: null });
            this.storeData();
            this.navegar('Arvore');
          }}>
          <View>
            <Text style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 17,
            }}>OK</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.cancel}
          onPress={() => {
              this.setState({ path: null });
          }}>
          <View>
            <Text style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 17,
            }}>Tirar outra</Text>
          </View>
        </TouchableHighlight>
      
      </View>
    )
  }

  exibirCamera(){
    return(
      <RNCamera
        ref={cam => {
          this.camera = cam;
        }}
        type={RNCamera.Constants.Type.back}
        style={styles.preview}
      >
        <TouchableHighlight
          style={styles.cancel}
          onPress={() => {
            this.setState({ path: null });
            this.navegar('Mapa');
          }}
        >
          <View>
            <Text style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 17,
              }}>Voltar</Text>
          </View>
        </TouchableHighlight>
        
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePhoto.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </RNCamera>
    )
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {this.state.path ? this.exibirFoto() : this.exibirCamera()}
      </View>
    );
  }
}