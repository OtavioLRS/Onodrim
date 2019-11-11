import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './styles';

export default class Mapa extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    region: null
  };

  handleMapPress = () => {
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
  }

  render() {
    const { region } = this.state;

    return (
      <MapView
        initialRegion={region}
        style={styles.mapView}
        rotateEnabled={false}
        // scrollEnabled={false}
        // zoomEnabled={false}
        showsPointsOfInterest={false}
        showBuildings={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={this.handleMapPress}
      >
      </MapView>
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
