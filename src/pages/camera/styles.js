import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: 'transparent',
  },
  ok: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
  },
  button: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});

export default styles;