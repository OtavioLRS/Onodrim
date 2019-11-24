import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mapView: {
    position: 'absolute',
    width,
    height,
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
  },

  position: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});

const ContainerMap = styled.View`  
  flex: 1;
  justifyContent: flex-end;
  alignItems: flex-end;
  backgroundColor: #78D561;
`;

const TextButton = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

export { styles, ContainerMap, TextButton };