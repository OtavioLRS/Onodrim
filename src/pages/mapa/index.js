import React, { Component } from 'react';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Footer, FooterTab, Button, Content } from 'native-base';
import Geolocation from '@react-native-community/geolocation'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

import {ContainerMap, TextButton, styles} from './styles';

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

  handleMapPress = async (e) => {
    if(this.state.listenTouch) {
      try {
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
          minZoomLevel={17}
          maxZoomLevel={30}
        >

          {this.state.showPutTree &&
            <View style={styles.position}>
              <TextButton>Clique onde deseja incluir uma árvore</TextButton>
            </View>
          }

          {this.state.markers.map(marker => {
            return (
              <Marker
                key={marker.id}
                title={marker.nome}
                description={marker.nome_cientifico}
                coordinate={marker.latlong}
                pinColor={'green'}
              >
              </ Marker>
            );
          })}
        </MapView>

        {this.state.showFooter && 
          <Footer style={{ backgroundColor: "#78D561" }}>
            <FooterTab style={{ backgroundColor: "#78D561" }}>
              <Button onPress={this.handleArvorePress}>
                <TextButton>Cadastrar árvore</TextButton>
              </Button>
            </FooterTab>
            <FooterTab style={{ backgroundColor: "#78D561" }}>
              <Button onPress={() => { this.navegar('Especie') }}>
                <TextButton>Cadastrar espécie</TextButton>
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





/* <ScrollView
    style={styles.placesContainer}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onMomentumScrollEnd={(e) => {
      const place = (e.nativeEvent.contentOffset.x > 0)
        ? e.nativeEvent.contentOffset.x / Dimensions.get('window').width
        : 0;

      const { latitude, longitude, mark } = this.state.places[place];

      this.mapView.animateToCoordinate({
        latitude,
        longitude
      }, 500);

      setTimeout(() => {
        mark.showCallout();
      }, 500)
    }}
  >
    {this.state.places.map(place => (
      <View key={place.id} style={styles.place}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.description}>{place.description}</Text>
      </View>
    ))}
  </ScrollView> */
