import { RNCamera } from 'react-native-camera'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { Component } from 'react';

export default class Camera extends Component {
  state = {
    type: RNCamera.Constants.Type.back,
  };

  takePhoto = async () => {
    // const { onTakePhoto } = this.props;
    const options = {
      quality: 0.5,
      base64: true,
      width: 300,
      height: 300,
    };
    
    const data = await this.camera.takePictureAsync(options);

    alert(data.uri);
    // onTakePhoto(data.base64);
  };

  render() {
    const { type } = this.state;
    return (
      <View style={styles.container}>
        
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          type={type}
          style={styles.preview}
        />
      
        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={this.takePhoto} style={styles.recordingButton}>
            <Text style={styles.bottomButtons}> SNAP </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
  },
  bottomButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  flipButton: {
    flex: 1,
    marginTop: 20,
    right: 20,
    alignSelf: 'flex-end',
  },
  recordingButton: {
    marginBottom: 10,
  },
});