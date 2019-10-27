import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button, Image, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import debounce from 'lodash/debounce'
import axios from 'axios'
import CountDown from 'react-native-countdown-component'

const handleBarCodeScanned = (scan, setDebounceScanCallback, setProductCallback, setCalCallback, setDisplayProduct) => {
  console.log('--------------- SCANNED ----------------', scan)
  setDebounceScanCallback(true)

  setTimeout(() => setDebounceScanCallback(false), 10000)

  axios.post('https://supermarketsweep.azurewebsites.net/game/scan',
    {
      gameId: "d623874a-f0fa-418c-b531-37b6318d7a58",
      gtin: `${scan.data}`,
    })
    .then((response) => {

      if (response.data) {
        console.log('------ product scan response ---------', response.data)
        setProductCallback(response.data)
        setCalCallback(response.data.caloriesLeft)
        console.log('I set product info')
        setDisplayProduct(true)
        console.log('I set display to true')
        setTimeout(() => {
          setDisplayProduct(false)
          console.log('I set display to false')
        }, 3000)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

const takePhoto = (photo) => {
  console.log('---------- PHOTO ---------------', photo)

  axios.post('https://supermarketsweep.azurewebsites.net/game/photo',
    {
      gameId: "d623874a-f0fa-418c-b531-37b6318d7a58",
      base64Image: photo.base64,
    })
    .then((response) => {

      if (response.data) {
        console.log('------ send photo response ---------', response.data)

      }
    })
    .catch(function (error) {
      console.log(error);
    })

}

const getCameraPermissions = async (setCameraPermissionCallback) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA)
  setCameraPermissionCallback(status === 'granted')
}

export default ShoppingScreen = () => {

  const type = Camera.Constants.Type.back
  const [hasCameraPermission, setCameraPermission] = useState()
  const [scanned, setScanned] = useState(false)
  const [scannedProduct, setScannedProduct] = useState({})
  const [displayProduct, setDisplayProduct] = useState(false)
  const [debounceScan, setDebounceScan] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300)
  const [calsLeft, setCalsLeft] = useState(2000)
  const camera = useRef()

  useEffect(() => {
    getCameraPermissions(setCameraPermission)
  }, [])


  return (
    <>
      {hasCameraPermission === null && <View />}
      {hasCameraPermission === false && <Text>No access to camera</Text>}
      {hasCameraPermission &&



        <View style={{ flex: 1 }}>

          {/* <CountDown
            until={timeLeft}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={15}
            timeToShow={['M', 'S']}
          /> */}


          <Camera ref={camera}
            style={{ flex: 1 }} type={type}
            onBarCodeScanned={scan => {
              console.log('SCANNER DEBOUNCED?', debounceScan)
              if (!debounceScan) handleBarCodeScanned(scan, setDebounceScan, setScannedProduct, setCalsLeft, setDisplayProduct)
            }} >

            <CountDown
              until={timeLeft}
              onFinish={() => alert('finished')}
              onPress={() => alert('hello')}
              size={15}
              timeToShow={['M', 'S']}
            />
            <Text style={styles.calsAndTimerText}> Calories left: {calsLeft} </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>

              {/* <Text style={styles.calsAndTimerText}> Time left: {count} </Text> */}

              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {displayProduct &&

                  <Image style={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center', borderRadius: 150 }}
                    source={{ uri: `${scannedProduct.imageUrl}` }} />


                }
                <View style={styles.takePhotoButton}>
                  <Button title='Take Photo'
                    color="white"
                    accessibilityLabel="Take a photo"
                    onPress={async () => {
                      if (camera) {
                        let photo = await camera.current.takePictureAsync({
                          base64: true,
                          quality: 0.1
                        });
                        takePhoto(photo)
                      }
                    }}
                  >
                  </Button>
                </View>

                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text> */}
              </TouchableOpacity>
            </View>
          </Camera>

          {
            scanned && (
              <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
            )
          }
        </View >
      }
    </>
  )
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
  },

  calsAndTimerText: {
    color: 'white',
    marginTop: 0,
    textAlign: 'center'
  },

  takePhotoButton: {
    backgroundColor: '#5ad45a',
    width: 100,
    marginBottom: 50,
    borderRadius: 75
  }


});

