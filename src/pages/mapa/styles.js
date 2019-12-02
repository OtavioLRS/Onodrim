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
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  escolherpos: {
    width: width - 40,
    maxHeight: 200,
    backgroundColor: '#78D561',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: '#FFF'
  },

  description: {
    color: '#FFF',
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
  },

  back: {
    left: 10,
    top: 10,
    position: 'absolute',
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

const ButtonGreen = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
  backgroundColor: #FFF;
  borderRadius: 5px;
`;

const TextButton = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 10px;
  textAlign: center;
`;

export { styles, ContainerMap, TextButton, ButtonGreen };