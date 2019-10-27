import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";

const HomeScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.bgImg}
      resizeMode="cover"
    >
      <View style={styles.screen}>
        <View style={styles.logoContainer}>
          <Image
            fadeDuration={750}
            source={require("../assets/logo.png")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              props.navigation.navigate("QuizTimer");
            }}
          >
            <Text style={styles.buttonText}>NEW GAME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  bgImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 100,
    marginTop: 200,
    backgroundColor: "white"
  },
  logo: {
    fontFamily: "Caviar-bold",
    textAlign: "center",
    fontSize: 40
  },
  image: {
    height: "100%",
    width: "100%"
  },
  menuContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  customButton: {
    width: "50%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D57900",
    padding: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5
  },
  buttonText: {
    fontFamily: "Caviar-bold",
    fontSize: 30
  }
});

export default HomeScreen;
