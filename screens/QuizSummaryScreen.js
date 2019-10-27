import React from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const QuizSummaryScreen = props => {
  const calories = props.navigation.getParam("calories");

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.bgImg}
        resizeMode="cover"
      >
        <View style={styles.titleContainer}>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Caviar-bold",
                fontSize: 22
              }}
            >
              YOU HAVE
            </Text>
          </View>
          <View style={styles.calories}>
            <Text style={styles.title}>{calories} CALORIES!</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              props.navigation.navigate("Shopping", { calories: calories });
            }}
          >
            <Text style={styles.buttonText}>START SHOPPING</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
    fontSize: 30,
    textAlign: "center"
  },
  titleContainer: {
    marginVertical: 200,
    paddingHorizontal: 30,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "black"
  },
  title: {
    textAlign: "center",
    fontFamily: "Caviar-bold",
    fontSize: 30,
    color: "white"
  },
  calories: {
    marginVertical: 30,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
    backgroundColor: "#026FDA",
    height: 150,
    width: 200,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default QuizSummaryScreen;
