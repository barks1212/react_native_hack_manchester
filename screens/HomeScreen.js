import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

const HomeScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>SUPERMARKET SWEEP</Text>
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
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  logoContainer: {
    flex: 1,
    marginVertical: 200,
    width: "90%",
    alignItems: "center"
  },
  logo: {
    fontFamily: "Caviar-bold",
    textAlign: "center",
    fontSize: 40
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
    backgroundColor: "green",
    padding: 10
  },
  buttonText: {
    fontFamily: "Caviar-bold",
    fontSize: 30
  }
});

export default HomeScreen;
