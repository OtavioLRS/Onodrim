import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';

export default class Mapa extends Component {
  state = {
    region: null
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => { // sucesso
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0140,
            longitudeDelta: 0.0225
          }
        });
      },
      (error) => this.setState({ error: error.message }), // erro
      { // propriedades
        enableHighAccuracy: true, 
        timeout: 2000, 
        maximumAge: 1000 
      }
    );
  }

  render() {
    const { region } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          region={region}
          style={styles.mapView}
          // rotateEnabled={false}
          // scrollEnabled={false}
          // zoomEnabled={false}
          // showsPointsOfInterest={false}
          // showBuildings={false}
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
