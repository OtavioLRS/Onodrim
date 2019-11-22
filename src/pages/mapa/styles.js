import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  placesContainer: {
    width: '100%',
    maxHeight: 200,
  },

  place: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  description: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const Container = styled.View`  
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #78D561;
`;

export {styles, Container};