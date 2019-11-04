import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

import styles from './styles';

export default class Mapa extends Component {
  state = {
    region: null
  };

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  async componentDidMount() {
    await Geolocation.watchPosition(
      ({coords}) => { // sucesso
        this.setState({
          region: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001
          }
        });
      },
      () => {}, // erro
      { // propriedades
        useSignificantChanges: true,
        enableHighAccuracy: true, 
        timeout: 60e3, 
        maximumAge: 10e3
      }
    );
  }
  
  render() {
    const { region } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          style={styles.mapView}
          rotateEnabled={false}
          // scrollEnabled={false}
          // zoomEnabled={false}
          showsPointsOfInterest={false}
          showBuildings={false}
          showsUserLocation={true}
          // showsMyLocationButton={true}
          // onPress={this.findPlace}
        >
        </MapView>
      </View>
    );
  }
}


  {/* <ScrollView
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
  </ScrollView> */}
