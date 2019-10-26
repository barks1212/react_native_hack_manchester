import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import debounce from 'lodash/debounce'
import axios from 'axios'

const handleBarCodeScanned = (scan, setDebounceScanCallback, setProductCallback, setDisplayProduct) => {
  console.log('--------------- SCANNED ----------------', scan)
  setDebounceScanCallback(true)

  setTimeout(() => setDebounceScanCallback(false), 10000)

  axios.post('https://supermarketsweep.azurewebsites.net/game/scan',
    {
      gameId: "26216fe8-ad2e-42bc-820c-988c2a915a78",
      gtin: `${scan.data}`,
    })
    .then((response) => {

      if (response.data) {
        console.log('------ product scan response ---------', response.data)
        setProductCallback(response.data)
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
          <Camera ref={camera}
            style={{ flex: 1 }} type={type}
            onBarCodeScanned={scan => {
              console.log('SCANNER DEBOUNCED?', debounceScan)
              if (!debounceScan) handleBarCodeScanned(scan, setDebounceScan, setScannedProduct, setDisplayProduct)
            }} >
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

                  if (camera) {
                    let photo = await camera.current.takePictureAsync();
                    takePhoto(photo)
                  }

                }}>
                {displayProduct &&
                  // <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> {scannedProduct.productName}, {scannedProduct.calories}  </Text>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> {'hi there shit goes herefdfddfdsfsfdsfdsfdsff'}  </Text>
                }
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
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

// export default class ShoppingScreen extends React.Component {

//   constructor(props) {
//     super(props)

//     this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this)

//     this.state = {
//       hasCameraPermission: null,
//       type: Camera.Constants.Type.back,
//       scanned: false,
//       basket: {},
//       scannedProduct: {},
//       displayProduct: false
//     };
//   }


//   async componentDidMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA)
//     this.setState({ hasCameraPermission: status === 'granted' })
//   }

//   componentDidUpdate(prevProps, prevState) {

//     const { scannedProduct } = this.state
//     if (prevState.scannedProduct !== this.state.scannedProduct) {
//       this.setState({ displayProduct: true })
//       setTimeout(() => this.setState({ displayProduct: false }), 1000)
//     }
//   }

//   handleBarCodeResponse = (response, setState) => {
//     // handle success
//     const { data } = response

//     if (data)
//       setState({ scannedProduct: data })

//   }
//   handleBarCodeScanned = ({ type, data }) => {
//     this.setState({ scanned: true });

//     axios.post('https://supermarketsweep.azurewebsites.net/game/scan',
//       {
//         gtin: `${data}`,

//       }
//     )
//       .then((response) => handleBarCodeResponse(response, this.setState))
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .finally(function () {
//         // always executed
//       });


//   };

//   takePhoto = ({ uri, width, height, exif, base64 }) => {
//     alert(`Photo take ${uri}, ${width}, ${height}`)
//   }


//   render() {
//     const { hasCameraPermission, scanned, displayProduct, scannedProduct } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (


//         <View style={{ flex: 1 }}>
//           <Camera ref={ref => {
//             this.camera = ref;
//           }}
//             style={{ flex: 1 }} type={this.state.type}
//             onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} >
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={async () => {

//                   if (this.camera) {
//                     let photo = await this.camera.takePictureAsync();
//                     this.takePhoto(photo)
//                   }

//                 }}>
//                 {displayProduct &&
//                   <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> {scannedProduct.productName}, {scannedProduct.calories}  </Text>
//                 }
//                 <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//           {/* <BarCodeScanner
//             barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8]}
//             onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
//             style={StyleSheet.absoluteFillObject}
//           /> */}

//           {scanned && (
//             <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
//           )}
//         </View >

//       );
//     }
//   }
// } 

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

