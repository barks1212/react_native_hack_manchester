import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>SUPERMARKET SWEEP</Text>
      </View>
      <View style={styles.menuContainer}>
        <Button
          title="New Game"
          onPress={() => {
            props.navigation.navigate("QuizTimer");
          }}
        />
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
    width: "100%",
    alignItems: "center"
  },
  logo: {
    fontFamily: "Roboto-bold",
    fontSize: 22
  },
  menuContainer: {
    flex: 1,
    width: "100%"
  },
  buttonText: {
    fontFamily: "Roboto-bold",
    fontSize: 18
  }
});

export default HomeScreen;
