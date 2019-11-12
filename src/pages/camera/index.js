import { RNCamera } from 'react-native-camera'
import {StatusBar, Text, View, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';


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
    const options = { quality: 1.0, base64: true };
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
        <Text
          style={styles.ok}
          onPress={() => {
            this.setState({ path: null });
            this.storeData();
            this.navegar('Arvore');
          }}
        >OK</Text>
        <Text
          style={styles.cancel}
          onPress={() => {
              this.setState({ path: null });
          }}
        >Tirar outra foto</Text>
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
        <Text
          style={styles.cancel}
          onPress={() => {
            this.setState({ path: null });
            this.navegar('Mapa');
          }}
        >Voltar</Text>
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
        {this.state.path ? this.exibirFoto() : this.exibirCamera()}
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  ok: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});