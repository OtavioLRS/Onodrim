import React, { Component } from 'react';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

import { Container, styles } from './styles';

// import { Drawer, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
// export default class Mapa extends Component {
//   static navigationOptions = {
//       header: null,
//   };

//   closeDrawer = () => {
//     this.drawer._root.close();
//   }; 

//   openDrawer = () => { 
//     this.drawer._root.open();
//   };

//   render() { 
//     return (
//       <Drawer 
//         ref={(ref) => { this.drawer = ref; }} 
//         content={<SideBar navigator={this.navigator} />} 
//         onClose={() => this.closeDrawer()} > 

//       </Drawer> 
//     );
//   }
// }











export default class Mapa extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    region: null,
    loading: true,
    move: false,
    markers: [],
  };

  handleMapPress = async (e) => {
    try {
      await AsyncStorage.setItem('local', JSON.stringify(e.nativeEvent.coordinate));
    } catch(e) {
      alert(e);
    }

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Camera' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

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
      // await fetch('http://192.168.43.169:3333/arvore', {
      // await fetch('http://186.217.108.38:3333/arvore', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        var elements = response[0].map((e) =>{
          const { latitude , longitude } = e;
          return({
            latlong: {
              latitude,
              longitude,
            },
            id: e.id_arvore,
            nome: e.nome_popular,
            nome_cientifico: e.nome_cientifico,
          });
        })
        this.setState({loading: false, move: true, markers: elements});
      })
      
  }

  render() {
    const { region } = this.state;

    return (
      <Container>
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

        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator size='large' />
          </View>
        }  
      </Container>
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
