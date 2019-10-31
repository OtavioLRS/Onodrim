import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
// import { createAppContainer } from 'react-navigation';
  
import MapView from 'react-native-maps';
import styles from './styles';
import locationPermission from '../locationPermission';  // MUDAR PARA O SIGNIN
// import Routes from './screens';

// const AppContainer = createAppContainer(Routes);

export default class Main extends Component {
  state = {
    places: [
      {
        id: 1,
        title: 'Sensor 1',
        description: 'Detalhes',
        latitude: -27.2106710,
        longitude: -49.6362700,
      },
      {
        id: 2,
        title: 'Sensor 2',
        description: 'Detalhes',
        latitude: -27.2006710,
        longitude: -49.6362700,
      },
    ]
  };

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  };

  render() {
    const { latitude, longitude } = this.state.places[0];

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          initialRegion = {{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231,
          }}
          style={styles.mapView}
          // rotateEnabled={false}
          // scrollEnabled={false}
          // zoomEnabled={false}
          showsPointsOfInterest={false}
          showBuildings={false}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onMapReady={this._mapReady}
        >
          {this.state.places.map(place => (
            <MapView.Marker
              ref={mark => place.mark = mark}
              title={place.title}
              description={place.description}
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            />
          ))}
        </MapView>

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
      </View>
    );
  }
}

// const { height, width } = Dimensions.get('window');