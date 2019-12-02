import React, { Component } from 'react';
import { StatusBar, View, Text, ActivityIndicator, ScrollView, Dimensions, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import Geolocation from '@react-native-community/geolocation'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

import { ContainerMap, TextButton, styles, ButtonGreen } from './styles';

export default class Mapa extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    region: null,
    loading: true,
    move: false,
    markers: [],
    listenTouch: false,
    showFooter: true,
    showPutTree: false,
  };

  navegar(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: rota }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleLocalatual = async () => {
    if(this.state.listenTouch) {
      try {
        await Geolocation.getCurrentPosition(
          ({ coords }) => {
            const coordinate = {
              latitude: coords.latitude,
              longitude: coords.longitude,
            }
            console.log(coordinate);
            AsyncStorage.setItem('local', JSON.stringify(coordinate));
          },
          () => { }, {
            useSignificantChanges: true,
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 10000
          });
      } catch(e) {
        alert(e);
      }
      this.navegar('Camera');
    }
  }

  handleMapPress = async (e) => {
    if(this.state.listenTouch) {
      try {
        console.log(e.nativeEvent.coordinate);
        await AsyncStorage.setItem('local', JSON.stringify(e.nativeEvent.coordinate));
      } catch(e) {
        alert(e);
      }
      this.navegar('Camera');
    }
  };

  handleArvorePress = () => {
    this.setState({listenTouch: true, showFooter: false, showPutTree: true});
  }

  handleAnalise = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('usuario'));
    if(user.grau_permissao > 1)
      this.navegar('Checagem');
    else alert('Você não tem permissão para acessar esta sessão!');
  }

  handleLogout = async () => {
    this.setState({loading: false});
    await AsyncStorage.removeItem('usuario');
    this.setState({loading: true});
    this.navegar('SignIn');
  }

  async componentDidMount() {
    await Geolocation.clearWatch(this.watchID);
    await Geolocation.watchPosition(
      ({ coords }) => { // sucesso
        this.setState({
          region: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001
          }
        });
      },
      () => { }, // erro
      { // propriedades
        useSignificantChanges: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000
      });
    await fetch('https://onodrim.herokuapp.com/arvore', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
          var elements = response[0].map((e) => {
            const { latitude, longitude } = e;
            return ({
              latlong: {
                latitude,
                longitude,
              },
              id: e.id_arvore,
              nome: e.nome_popular,
              nome_cientifico: e.nome_cientifico,
              fotos: e.fotos,
              altura: e.altura,
              largura: e.largura,
              data_plantio: e.data_plantio,
              mark: null,
            });
          })
          this.setState({ loading: false, move: true, markers: elements });
      })
  }

  render() {
    const { region } = this.state;

    return (
      <ContainerMap>
        <StatusBar hidden/>

        <MapView
          ref={map => this.mapView = map}
          initialRegion={{
            latitude: -22.132083070946305,
            longitude: -51.391217261552820,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001
          }}
          region={region}
          style={styles.mapView}
          rotateEnabled={this.state.move}
          scrollEnabled={this.state.move}
          zoomEnabled={this.state.move}
          showsPointsOfInterest={false}
          showBuildings={false}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={this.handleMapPress}
          minZoomLevel={15}
          maxZoomLevel={50}
        >

          {this.state.markers.map(marker => {
            return (
              <MapView.Marker
                ref={mark => marker.mark = mark}
                key={marker.id}
                title={marker.nome}
                description={marker.nome_cientifico}
                coordinate={marker.latlong}
                pinColor={'green'}
              >
                <MapView.Callout 
                  tooltip={true} 
                  onPress={async () => {
                    let aux = {
                      nome_cientifico: marker.nome_cientifico,
                      nome_popular: marker.nome,
                      altura: marker.altura,
                      largura: marker.largura,
                      data_plantio: marker.data_plantio,
                      fotos: marker.fotos,
                    }
                    await AsyncStorage.setItem('marker', JSON.stringify(aux));
                    this.navegar('Detalhes');
                  }}
                >
                  <View style={styles.place}>
                    <Text>
                      <Image
                        style={styles.place}
                        source={{uri: marker.fotos}}
                        resizeMode='cover'
                      />
                    </Text>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}

        </MapView>

        {this.state.showPutTree &&
          <TouchableOpacity style={styles.back} onPress={() => { this.setState({ showPutTree: false, listenTouch: false, showFooter: true }) }}>
            <Image
              style={{ height: 50, width: 50 }}
              source={require('../../images/back.png')}
            />
          </TouchableOpacity>
        }

        {this.state.showPutTree &&
          <View style={styles.escolherpos}>
            <TextButton style={{ fontSize: 15 }}>Toque na localização da árvore</TextButton>
            <ButtonGreen style={{ width: 100, }}onPress={this.handleLocalatual}>
              <TextButton style={{ color: '#78D561'}}>Usar localização do usuário</TextButton>
            </ButtonGreen>
          </View>
        }

        {this.state.showFooter && 
          <Footer style={{ backgroundColor: "#78D561" }}>
            <FooterTab style={{ backgroundColor: "#78D561" }}>
              <Button onPress={this.handleArvorePress}>
              <Icon name="logo-apple" style={{color: 'white'}}/>
                <TextButton>Cadastrar árvore</TextButton>
              </Button>
            </FooterTab>
            <FooterTab style={{ backgroundColor: "#78D561" }}>
              <Button onPress={() => { this.navegar('Especie') }}>
                <Icon name="rose" style={{ color: 'white' }}/>
                <TextButton>Sugerir espécie</TextButton>
              </Button>
            </FooterTab>
            <FooterTab style={{ backgroundColor: "#78D561" }}>
              <Button onPress={this.handleAnalise}>
                <Icon name="apps" style={{ color: 'white' }}/>
                <TextButton>Analisar sugestões</TextButton>
              </Button>
            </FooterTab>
          <FooterTab style={{ backgroundColor: "#78D561" }}>
            <Button onPress={this.handleLogout}>
              <Icon name="person" style={{ color: 'white' }} />
              <TextButton>Logout</TextButton>
            </Button>
          </FooterTab>
          </Footer>
        }

        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        }    

      </ContainerMap>
    );
  }
}