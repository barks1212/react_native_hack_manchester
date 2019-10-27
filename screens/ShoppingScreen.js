import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  Alert,
  Platform
} from "react-native";
import { useSelector } from 'react-redux'
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import debounce from "lodash/debounce";
import get from "lodash/get";
import axios from "axios";
import CountDown from "react-native-countdown-component";

import BlinkView from "react-native-blink-view";

const handleBarCodeScanned = (
  scan,
  setDebounceScanCallback,
  setProductCallback,
  setCalCallback,
  setDisplayProduct,
  setIsDonationCb,
  gameId
) => {
  console.log("--------------- SCANNED ----------------", scan);
  setDebounceScanCallback(true);

  setTimeout(() => setDebounceScanCallback(false), 10000);

  axios
    .post("https://supermarketsweep.azurewebsites.net/game/scan", {
      // gameId: "ea626bbd-4604-427f-a4eb-0391178157af",
      gameId: gameId,
      gtin: `${scan.data}`
    })
    .then(response => {
      if (response.data) {
        console.log("------ product scan response ---------", response.data);
        setProductCallback(response.data);
        setCalCallback(response.data.caloriesLeft);
        console.log("I set product info");
        setDisplayProduct(true);
        // response.data.isDonation && setIsDonationCb(true)
        setIsDonationCb(true);
        //
        console.log("I set display to true");
        setTimeout(() => {

          setDisplayProduct(false);
          setIsDonationCb(false);
          console.log("I set display to false");
        }, 3000);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const takePhoto = (
  photo,
  setScannedBonusCb,
  setDisplayBonusCb,
  setCalsLeftCb,
  gameId
) => {
  console.log("---------- PHOTO ---------------", photo);

  axios
    .post("https://supermarketsweep.azurewebsites.net/game/photo", {
      // gameId: "ea626bbd-4604-427f-a4eb-0391178157af",
      gameId: gameId,
      base64Image: photo.base64
    })
    .then(response => {
      if (response.data) {
        console.log("------ send photo response ---------", response.data);
      }
      if (response.data.isBonus) {
        setScannedBonusCb(response.data);
        setDisplayBonusCb(true);
        console.log("I set displayBonus to true");
        setTimeout(() => {
          setDisplayBonusCb(false);
          console.log("I set displayBonus to false");
        }, 3000);
        setCalsLeftCb(response.data.caloriesLeft);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// const onGameOver = props => {
//   console.log("game over");

// };

const getCameraPermissions = async setCameraPermissionCallback => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  setCameraPermissionCallback(status === "granted");
};

export default ShoppingScreen = props => {
  const type = Camera.Constants.Type.back;
  const [hasCameraPermission, setCameraPermission] = useState();
  const [scanned, setScanned] = useState(false);
  const [scannedProduct, setScannedProduct] = useState({});
  const [displayProduct, setDisplayProduct] = useState(false);
  const [debounceScan, setDebounceScan] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [calsLeft, setCalsLeft] = useState();
  const [displayBonus, setDisplayBonus] = useState(false);
  const [scannedBonus, setScannedBonus] = useState();
  const [donation, setIsDonation] = useState(false);
  // const [isGameOver, setIsGameOver] = useState(false)
  //
  const gameId = useSelector(state => get(state, 'game.gameId'))


  // useEffect(() => {
  //   props.navigation.popToTop()
  // },[isGameOver])

  const donationMessage = () => {
    const messages = [
      "You Rock!",
      "Flawless Victory!",
      "Hadooken!",
      "Yoga Flame!",
      "You Done Good!",
      "You just fed an empty belleeeeh!",
      "A divine entity says - Nice Work"
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  };

  const camera = useRef();

  useEffect(() => {
    getCameraPermissions(setCameraPermission);
  }, []);

  return (
    <>
      {hasCameraPermission === null && <View />}
      {hasCameraPermission === false && <Text>No access to camera</Text>}
      {hasCameraPermission && (
        <View style={{ flex: 1 }}>
          {/* <CountDown
            until={timeLeft}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={15}
            timeToShow={['M', 'S']}
          /> */}

          <Camera
            ref={camera}
            style={{ flex: 1 }}
            type={type}
            onBarCodeScanned={scan => {
              console.log("SCANNER DEBOUNCED?", debounceScan);
              if (!debounceScan)
                handleBarCodeScanned(
                  scan,
                  setDebounceScan,
                  setScannedProduct,
                  setCalsLeft,
                  setDisplayProduct,
                  setIsDonation,
                  gameId
                );
            }}
          >
            <CountDown
              until={timeLeft}
              onFinish={() => {
                console.log('props: ', props)
                props.navigation.navigate("ShoppingSummary");
              }}
              // onFinish={() => props.navigation.navigate("Shopping Summary")}

              size={15}
              timeToShow={["M", "S"]}
            />
            <Text style={styles.calsAndTimerText}>
              {" "}
              Calories left: {calsLeft}{" "}
            </Text>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* <Text style={styles.calsAndTimerText}> Time left: {count} </Text> */}

              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
              >
                {displayProduct && (
                  <Image
                    style={{
                      width: 300,
                      height: 300,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 150
                    }}
                    source={{ uri: `${scannedProduct.imageUrl}` }}
                  />
                )}
                {donation && (
                  <BlinkView delay={250}>
                    <Text style={styles.calsAndTimerText}>
                      {donationMessage()}
                    </Text>
                  </BlinkView>
                )}

                {displayBonus && (
                  <Image
                    style={{
                      width: 300,
                      height: 300,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 150
                    }}
                    source={{ uri: `${scannedBonus.imageUrl}` }}
                  />
                )}
                <View style={styles.takePhotoButton}>
                  <Button
                    title="Bonus Item"
                    color={Platform.OS === "android" ? "" : "white"}
                    accessibilityLabel="Take a photo"
                    onPress={async () => {
                      if (camera) {
                        let photo = await camera.current.takePictureAsync({
                          base64: true,
                          quality: 0.1
                        });
                        takePhoto(
                          photo,
                          setScannedBonus,
                          setDisplayBonus,
                          setCalsLeft,
                          gameId
                        );
                      }
                    }}
                  ></Button>
                </View>

                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text> */}
              </TouchableOpacity>
            </View>
          </Camera>

          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => this.setState({ scanned: false })}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  calsAndTimerText: {
    color: "white",
    marginTop: 0,
    textAlign: "center"
  },

  takePhotoButton: {
    backgroundColor: "#5ad45a",
    width: 100,
    marginBottom: 50,
    borderRadius: 75
  }
});
