import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';


export default class ShoppingScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    scanned: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  takePhoto = ({ uri, width, height, exif, base64 }) => {
    alert(`Photo take ${uri}, ${width}, ${height}`)
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.screen}>
          <Text>ShoppingScreen</Text>
          <Button
            title="To Shopping Summary"
            onPress={() => {
              props.navigation.navigate("ShoppingSummary");
            }}
          />

          <View style={{ flex: 1 }}>
            <Camera ref={ref => {
              this.camera = ref;
            }}
              style={{ flex: 1 }} type={this.state.type}
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={async () => {

                    if (this.camera) {
                      let photo = await this.camera.takePictureAsync();
                      this.takePhoto(photo)
                    }

                  }}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
                </TouchableOpacity>
              </View>
            </Camera>
            {/* <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8]}
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          /> */}

            {scanned && (
              <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
            )}
          </View >

        </View>


      );
    }
  }
}

ShoppingScreen.navigationOptions = {
  headerTitle: "Shopping",
  headerLeft: null
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});